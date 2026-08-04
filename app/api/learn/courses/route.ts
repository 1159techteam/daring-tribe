import { NextResponse } from "next/server"
import { createServerClient, createServiceRoleClient } from "@/lib/supabase/server"

type LessonRow = {
  id: string
  slug: string
  title: string
  description: string | null
  video_url: string | null
  duration_seconds: number | null
  xp_reward: number
  sort_order: number
  is_published: boolean
}

type ModuleRow = {
  id: string
  title: string
  sort_order: number
  learn_lessons: LessonRow[] | null
}

type CourseRow = {
  id: string
  slug: string
  title: string
  description: string | null
  difficulty: string
  cover_image_url: string | null
  xp_bonus: number
  sort_order: number
  learn_modules: ModuleRow[] | null
}

/** GET /api/learn/courses — published catalog (+ progress when signed in) */
export async function GET() {
  try {
    const admin = createServiceRoleClient()
    const { data: courses, error } = await admin
      .from("learn_courses")
      .select(
        `
        id, slug, title, description, difficulty, cover_image_url, xp_bonus, sort_order,
        learn_modules (
          id, title, sort_order,
          learn_lessons ( id, slug, title, description, video_url, duration_seconds, xp_reward, sort_order, is_published )
        )
      `
      )
      .eq("is_published", true)
      .order("sort_order", { ascending: true })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const list = (courses || []) as CourseRow[]

    let completedLessonIds = new Set<string>()
    try {
      const supabase = await createServerClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        const allLessonIds = list.flatMap((c) =>
          (c.learn_modules || []).flatMap((m) =>
            (m.learn_lessons || [])
              .filter((l) => l.is_published !== false)
              .map((l) => l.id)
          )
        )

        if (allLessonIds.length > 0) {
          const { data: progress } = await admin
            .from("learn_lesson_progress")
            .select("lesson_id")
            .eq("user_id", user.id)
            .in("lesson_id", allLessonIds)

          completedLessonIds = new Set((progress || []).map((p) => p.lesson_id as string))
        }
      }
    } catch {
      // Catalog still works without auth cookies
    }

    const enriched = list.map((course) => {
      const lessons = (course.learn_modules || []).flatMap((m) =>
        (m.learn_lessons || []).filter((l) => l.is_published !== false)
      )
      const total = lessons.length
      const completedIds = lessons
        .filter((l) => completedLessonIds.has(l.id))
        .map((l) => l.id)
      const completed = completedIds.length
      const percent = total === 0 ? 0 : Math.round((completed / total) * 100)

      return {
        ...course,
        progress: {
          completed_lessons: completed,
          total_lessons: total,
          percent,
          completed_lesson_ids: completedIds,
        },
      }
    })

    return NextResponse.json({ courses: enriched })
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to load courses"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
