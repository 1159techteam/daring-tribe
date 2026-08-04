import { NextResponse } from "next/server"
import { createServiceRoleClient } from "@/lib/supabase/server"

/** Public read of learn XP settings (daily check-in amount). */
export async function GET() {
  try {
    const admin = createServiceRoleClient()
    const { data } = await admin
      .from("app_settings")
      .select("key, value")
      .eq("key", "learn_daily_checkin_xp")
      .maybeSingle()

    const dailyCheckinXp = data?.value != null ? Number(data.value) : 25
    return NextResponse.json({
      learn_daily_checkin_xp: Number.isFinite(dailyCheckinXp) ? dailyCheckinXp : 25,
    })
  } catch {
    return NextResponse.json({ learn_daily_checkin_xp: 25 })
  }
}
