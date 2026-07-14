import { NextResponse } from "next/server"
import { createServiceRoleClient } from "@/lib/supabase/server"
import {
  DEFAULT_CADRE_TIERS,
  getCadreForLevel,
  getLevelFromXp,
  type CadreTier,
} from "@/lib/learn/levels"
import { displayUsername } from "@/lib/learn/display-name"

/** GET /api/learn/leaderboard — top learners by lifetime XP */
export async function GET() {
  try {
    const admin = createServiceRoleClient()

    const { data: balances } = await admin
      .from("v_user_xp_balance")
      .select("user_id, xp_balance")
      .order("xp_balance", { ascending: false })
      .limit(50)

    const ids = (balances || []).map((b) => b.user_id)
    if (ids.length === 0) {
      return NextResponse.json({ leaderboard: [] })
    }

    const { data: users } = await admin
      .from("users")
      .select("id, name, email")
      .in("id", ids)

    const { data: thresholds } = await admin
      .from("learn_level_thresholds")
      .select("level, xp_required")
      .order("level")

    const { data: tiers } = await admin
      .from("learn_cadre_tiers")
      .select("slug, name, min_level, sort_order")
      .order("sort_order")

    const cadreTiers = (tiers as CadreTier[] | null)?.length
      ? (tiers as CadreTier[])
      : DEFAULT_CADRE_TIERS

    const userMap = new Map((users || []).map((u) => [u.id, u]))

    const leaderboard = (balances || []).map((b, index) => {
      const u = userMap.get(b.user_id)
      const levelInfo = getLevelFromXp(b.xp_balance || 0, thresholds || undefined)
      const cadre = getCadreForLevel(levelInfo.level, cadreTiers)
      return {
        rank: index + 1,
        user_id: b.user_id,
        name: displayUsername({ name: u?.name, email: u?.email }),
        lifetime_xp: b.xp_balance || 0,
        level: levelInfo.level,
        cadre: cadre.name,
        cadre_slug: cadre.slug,
      }
    })

    return NextResponse.json({ leaderboard })
  } catch (e) {
    const message = e instanceof Error ? e.message : "Leaderboard failed"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
