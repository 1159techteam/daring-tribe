import { NextResponse } from "next/server"
import { createServiceRoleClient } from "@/lib/supabase/server"

/** GET /api/learn/courses — published catalog */
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

    return NextResponse.json({ courses: courses || [] })
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to load courses"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
