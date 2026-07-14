import { NextResponse } from "next/server"
import { createServerClient, createServiceRoleClient } from "@/lib/supabase/server"

/** GET /api/learn/certificates — course certificates for current user */
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
    const { data, error: cErr } = await admin
      .from("learn_certificates")
      .select(
        "id, title, certificate_code, issued_at, course_id, learn_courses(slug, title, difficulty)"
      )
      .eq("user_id", user.id)
      .order("issued_at", { ascending: false })

    if (cErr) {
      // Table may not exist until migration 046
      return NextResponse.json({ certificates: [], error: cErr.message })
    }

    return NextResponse.json({ certificates: data || [] })
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to load certificates"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
