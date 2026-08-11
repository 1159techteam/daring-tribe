import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

/** POST /api/auth/signout — clear shared SSO session (no browser Supabase client). */
export async function POST() {
  const supabase = await createServerClient()
  await supabase.auth.signOut()
  return NextResponse.json({ ok: true })
}
