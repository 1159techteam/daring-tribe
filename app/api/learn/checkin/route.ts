import { NextResponse } from "next/server"
import { createServerClient, createServiceRoleClient } from "@/lib/supabase/server"
import { grantXp } from "@/lib/learn/xp"
import { DAILY_CHECKIN_XP } from "@/lib/learn/levels"

function lagosDateString() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Lagos",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date())
}

function yesterdayLagos() {
  const lagosNow = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Africa/Lagos" })
  )
  lagosNow.setDate(lagosNow.getDate() - 1)
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(lagosNow)
}

async function getDailyCheckinXp(admin: ReturnType<typeof createServiceRoleClient>) {
  try {
    const { data } = await admin
      .from("app_settings")
      .select("value")
      .eq("key", "learn_daily_checkin_xp")
      .maybeSingle()
    const n = data?.value != null ? Number(data.value) : DAILY_CHECKIN_XP
    return Number.isInteger(n) && n >= 0 ? n : DAILY_CHECKIN_XP
  } catch {
    return DAILY_CHECKIN_XP
  }
}

/** POST /api/learn/checkin — daily streak XP (once per Lagos day) */
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

    const admin = createServiceRoleClient()
    const checkinXp = await getDailyCheckinXp(admin)
    const today = lagosDateString()

    const { data: existing } = await admin
      .from("learn_daily_activity")
      .select("id, streak_count, xp_awarded")
      .eq("user_id", user.id)
      .eq("activity_date", today)
      .maybeSingle()

    if (existing) {
      return NextResponse.json({
        already_checked_in: true,
        streak: existing.streak_count,
        xp_awarded: 0,
      })
    }

    const { data: yesterdayRow } = await admin
      .from("learn_daily_activity")
      .select("streak_count")
      .eq("user_id", user.id)
      .eq("activity_date", yesterdayLagos())
      .maybeSingle()

    const streak = (yesterdayRow?.streak_count || 0) + 1

    const { data: activity, error: insertErr } = await admin
      .from("learn_daily_activity")
      .insert({
        user_id: user.id,
        activity_date: today,
        xp_awarded: checkinXp,
        streak_count: streak,
      })
      .select()
      .single()

    if (insertErr) {
      return NextResponse.json({ error: insertErr.message }, { status: 500 })
    }

    await grantXp({
      userId: user.id,
      amount: checkinXp,
      type: "daily_checkin",
      referenceId: activity.id,
      note: `Daily check-in (streak ${streak})`,
      createdBy: user.id,
    })

    if (streak >= 7) {
      const { data: badge } = await admin
        .from("learn_badges")
        .select("id")
        .eq("slug", "streak-7")
        .maybeSingle()
      if (badge) {
        await admin.from("learn_user_badges").upsert(
          { user_id: user.id, badge_id: badge.id },
          { onConflict: "user_id,badge_id", ignoreDuplicates: true }
        )
      }
    }

    return NextResponse.json({
      already_checked_in: false,
      streak,
      xp_awarded: checkinXp,
    })
  } catch (e) {
    const message = e instanceof Error ? e.message : "Check-in failed"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
