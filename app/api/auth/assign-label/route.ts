import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { assignDaringTribeLabelIfUnset } from "@/lib/labels"

/** POST /api/auth/assign-label: Daring Tribe label for new members only (never overwrites Buddy admin labels) */
export async function POST() {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    if (error || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const result = await assignDaringTribeLabelIfUnset(user.id)
    return NextResponse.json({
      ok: true,
      assigned: result.assigned,
      label_id: result.label_id,
    })
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to assign label"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
