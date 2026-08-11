import { NextResponse } from "next/server"
import { createServerClient, createServiceRoleClient } from "@/lib/supabase/server"
import { getSessionUser } from "@/lib/auth/get-session-user"

/** GET /api/learn/certificates: course certificates for current user */
export async function GET() {
  try {
    const supabase = await createServerClient()
    const { user, error } = await getSessionUser()
    if (error || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const admin = createServiceRoleClient()
    const [{ data, error: cErr }, { data: profile }] = await Promise.all([
      admin
        .from("learn_certificates")
        .select(
          "id, title, certificate_code, issued_at, course_id, learn_courses(slug, title, difficulty)"
        )
        .eq("user_id", user.id)
        .order("issued_at", { ascending: false }),
      admin.from("users").select("name, email").eq("id", user.id).maybeSingle(),
    ])

    if (cErr) {
      // Table may not exist until migration 046
      return NextResponse.json({ certificates: [], error: cErr.message })
    }

    return NextResponse.json({
      certificates: data || [],
      recipient: {
        name: profile?.name || null,
        email: profile?.email || user.email || null,
      },
    })
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to load certificates"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
