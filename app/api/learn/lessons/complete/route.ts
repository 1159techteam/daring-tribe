import { NextRequest, NextResponse } from "next/server"
import { createServerClient, createServiceRoleClient } from "@/lib/supabase/server"
import { grantXp } from "@/lib/learn/xp"

/** POST /api/learn/lessons/complete — { lesson_id } */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    if (error || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json().catch(() => ({}))
    const lessonId = body.lesson_id as string | undefined
    if (!lessonId) {
      return NextResponse.json({ error: "lesson_id required" }, { status: 422 })
    }

    const admin = createServiceRoleClient()

    const { data: lesson, error: lessonErr } = await admin
      .from("learn_lessons")
      .select("id, title, xp_reward, module_id, learn_modules(course_id)")
      .eq("id", lessonId)
      .single()

    if (lessonErr || !lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 })
    }

    const { data: existing } = await admin
      .from("learn_lesson_progress")
      .select("id, xp_awarded")
      .eq("user_id", user.id)
      .eq("lesson_id", lessonId)
      .maybeSingle()

    if (existing) {
      return NextResponse.json({
        already_completed: true,
        xp_awarded: 0,
        progress_id: existing.id,
      })
    }

    const xpReward = lesson.xp_reward || 0
    const modulesRel = (lesson as { learn_modules?: { course_id: string } | { course_id: string }[] | null })
      .learn_modules
    const courseId = Array.isArray(modulesRel)
      ? modulesRel[0]?.course_id
      : modulesRel?.course_id

    if (courseId) {
      await admin.from("learn_enrollments").upsert(
        { user_id: user.id, course_id: courseId },
        { onConflict: "user_id,course_id", ignoreDuplicates: true }
      )
    }

    const { data: progress, error: progErr } = await admin
      .from("learn_lesson_progress")
      .insert({
        user_id: user.id,
        lesson_id: lessonId,
        xp_awarded: xpReward,
      })
      .select()
      .single()

    if (progErr) {
      return NextResponse.json({ error: progErr.message }, { status: 500 })
    }

    if (xpReward > 0) {
      await grantXp({
        userId: user.id,
        amount: xpReward,
        type: "lesson_complete",
        referenceId: progress.id,
        note: `Completed lesson: ${lesson.title}`,
        createdBy: user.id,
      })
    }

    // First lesson badge
    const { count } = await admin
      .from("learn_lesson_progress")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
    if (count === 1) {
      const { data: badge } = await admin
        .from("learn_badges")
        .select("id")
        .eq("slug", "first-lesson")
        .maybeSingle()
      if (badge) {
        await admin.from("learn_user_badges").upsert(
          { user_id: user.id, badge_id: badge.id },
          { onConflict: "user_id,badge_id", ignoreDuplicates: true }
        )
      }
    }

    // Course completion check
    let courseCompleted = false
    let courseXp = 0
    if (courseId) {
      const { data: modules } = await admin
        .from("learn_modules")
        .select("id")
        .eq("course_id", courseId)
      const moduleIds = (modules || []).map((m) => m.id)
      const { data: allLessons } = await admin
        .from("learn_lessons")
        .select("id")
        .in("module_id", moduleIds)
        .eq("is_published", true)
      const lessonIds = (allLessons || []).map((l) => l.id)
      if (lessonIds.length > 0) {
        const { count: done } = await admin
          .from("learn_lesson_progress")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id)
          .in("lesson_id", lessonIds)
        if (done === lessonIds.length) {
          courseCompleted = true
          const { data: course } = await admin
            .from("learn_courses")
            .select("id, title, xp_bonus")
            .eq("id", courseId)
            .single()
          await admin
            .from("learn_enrollments")
            .update({ completed_at: new Date().toISOString() })
            .eq("user_id", user.id)
            .eq("course_id", courseId)
            .is("completed_at", null)

          courseXp = course?.xp_bonus || 0
          if (courseXp > 0) {
            await grantXp({
              userId: user.id,
              amount: courseXp,
              type: "course_complete",
              referenceId: courseId,
              note: `Completed course: ${course?.title}`,
              createdBy: user.id,
            })
          }

          const { data: courseBadge } = await admin
            .from("learn_badges")
            .select("id")
            .eq("course_id", courseId)
            .maybeSingle()
          if (courseBadge) {
            await admin.from("learn_user_badges").upsert(
              {
                user_id: user.id,
                badge_id: courseBadge.id,
                is_featured: true,
              },
              { onConflict: "user_id,badge_id" }
            )
          }
        }
      }
    }

    return NextResponse.json({
      already_completed: false,
      xp_awarded: xpReward,
      course_completed: courseCompleted,
      course_xp_awarded: courseXp,
      progress_id: progress.id,
    })
  } catch (e) {
    const message = e instanceof Error ? e.message : "Complete failed"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
