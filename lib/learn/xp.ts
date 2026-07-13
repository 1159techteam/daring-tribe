import { createServiceRoleClient } from "@/lib/supabase/server"

export async function getActiveSeasonId(): Promise<string | null> {
  const admin = createServiceRoleClient()
  const { data } = await admin
    .from("seasons")
    .select("id")
    .eq("status", "active")
    .order("starts_at", { ascending: false })
    .limit(1)
    .maybeSingle()
  return data?.id ?? null
}

type LearnXpType =
  | "lesson_complete"
  | "daily_checkin"
  | "course_complete"
  | "badge_bonus"
  | "admin_gift"

export async function grantXp(params: {
  userId: string
  amount: number
  type: LearnXpType
  referenceId?: string | null
  note?: string | null
  createdBy?: string | null
}) {
  if (params.amount <= 0) return null
  const admin = createServiceRoleClient()
  const seasonId = await getActiveSeasonId()
  const payload = {
    user_id: params.userId,
    amount: params.amount,
    type: params.type as string,
    reference_id: params.referenceId ?? null,
    season_id: seasonId,
    note: params.note ?? null,
    created_by: params.createdBy ?? null,
  }

  const { data, error } = await admin.from("xp_transactions").insert(payload).select().single()

  if (error) {
    const fallback = {
      ...payload,
      type: "admin_gift",
      note: params.note
        ? `[${params.type}] ${params.note}`
        : `[${params.type}] learning XP grant`,
    }
    const { data: data2, error: error2 } = await admin
      .from("xp_transactions")
      .insert(fallback)
      .select()
      .single()
    if (error2) throw new Error(error2.message)
    return data2
  }
  return data
}

export async function getSeasonXp(userId: string): Promise<number> {
  const admin = createServiceRoleClient()
  const { data } = await admin
    .from("v_user_xp_balance_current_season")
    .select("xp_balance")
    .eq("user_id", userId)
    .maybeSingle()
  return data?.xp_balance ?? 0
}

export async function getLifetimeXp(userId: string): Promise<number> {
  const admin = createServiceRoleClient()
  const { data } = await admin
    .from("v_user_xp_balance")
    .select("xp_balance")
    .eq("user_id", userId)
    .maybeSingle()
  if (data?.xp_balance != null) return data.xp_balance

  const { data: rows } = await admin.from("xp_transactions").select("amount").eq("user_id", userId)
  return (rows || []).reduce((sum: number, r: { amount: number }) => sum + (r.amount || 0), 0)
}
