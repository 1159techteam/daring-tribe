import { NextResponse } from "next/server"
import { createServerClient, createServiceRoleClient } from "@/lib/supabase/server"

/** GET /api/learn/badges — current user's collected badges */
export async function GET() {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    if (error || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const admin = createServiceRoleClient()
    const { data: badges, error: bErr } = await admin
      .from("learn_user_badges")
      .select(
        "id, earned_at, is_featured, learn_badges(id, slug, name, description, badge_type, xp_value, image_url, course_id)"
      )
      .eq("user_id", user.id)
      .order("earned_at", { ascending: false })

    if (bErr) {
      return NextResponse.json({ error: bErr.message }, { status: 500 })
    }

    return NextResponse.json({ badges: badges || [] })
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to load badges"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
