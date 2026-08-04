import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { assignDaringTribeLabel } from "@/lib/labels"

/** POST /api/auth/assign-label — attach Daring Tribe label after signup/login */
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

    const labelId = await assignDaringTribeLabel(user.id)
    return NextResponse.json({ ok: true, label_id: labelId })
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to assign label"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
