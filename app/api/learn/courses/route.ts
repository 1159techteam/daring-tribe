import { NextResponse } from "next/server"
import { createServiceRoleClient } from "@/lib/supabase/server"
import { requireLearnMember } from "@/lib/learn/require-member"

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

function sanitizeLesson(lesson: LessonRow) {
  const { video_url, ...rest } = lesson
  return {
    ...rest,
    has_video: Boolean(video_url?.trim()),
  }
}

/** GET /api/learn/courses — published catalog for Tribe members (+ progress) */
export async function GET() {
  try {
    const auth = await requireLearnMember()
    if (auth.error) return auth.error

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

    const allLessonIds = list.flatMap((c) =>
      (c.learn_modules || []).flatMap((m) =>
        (m.learn_lessons || [])
          .filter((l) => l.is_published !== false)
          .map((l) => l.id)
      )
    )

    let completedLessonIds = new Set<string>()
    if (allLessonIds.length > 0) {
      const { data: progress } = await admin
        .from("learn_lesson_progress")
        .select("lesson_id")
        .eq("user_id", auth.user.id)
        .in("lesson_id", allLessonIds)

      completedLessonIds = new Set((progress || []).map((p) => p.lesson_id as string))
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

      const learn_modules = (course.learn_modules || []).map((mod) => ({
        ...mod,
        learn_lessons: (mod.learn_lessons || [])
          .filter((l) => l.is_published !== false)
          .map(sanitizeLesson),
      }))

      return {
        ...course,
        learn_modules,
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
