import { NextResponse } from "next/server"
import { createServerClient, createServiceRoleClient } from "@/lib/supabase/server"
import { normalizeInstagramHandle } from "@/lib/social-handles"

const TRIBE_TITLE_PREFIX = "Tribe:"

type QuestRow = {
  id: string
  title: string
  description: string
  xp_reward: number
  tier: string
  expiration_date: string
  link: string | null
}

type CompletionRow = {
  quest_id: string
  status: string
  xp_awarded: number
  completed_at: string
}

/** GET /api/quests — Tribe starter social quests + user completion status */
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
    const { data: quests, error: qErr } = await admin
      .from("quests")
      .select("id, title, description, xp_reward, tier, expiration_date, link")
      .ilike("title", `${TRIBE_TITLE_PREFIX}%`)
      .eq("tier", "D")
      .gt("expiration_date", new Date().toISOString())
      .order("created_at", { ascending: true })

    if (qErr) {
      return NextResponse.json({ error: qErr.message }, { status: 500 })
    }

    const questList = (quests || []) as QuestRow[]
    const ids = questList.map((q) => q.id)

    let completions: CompletionRow[] = []
    if (ids.length > 0) {
      const { data: comps } = await admin
        .from("quest_completions")
        .select("quest_id, status, xp_awarded, completed_at")
        .eq("user_id", user.id)
        .in("quest_id", ids)
        .order("completed_at", { ascending: false })
      completions = (comps || []) as CompletionRow[]
    }

    const { data: profile } = await admin
      .from("users")
      .select("social_handles")
      .eq("id", user.id)
      .maybeSingle()

    const ig = normalizeInstagramHandle(
      (profile?.social_handles as { instagram?: string } | null)?.instagram
    )

    const enriched = questList.map((q) => {
      const mine = completions.filter((c) => c.quest_id === q.id)
      const approved = mine.find((c) => c.status === "approved" || c.status === "auto-approved")
      const pending = mine.find((c) => c.status === "pending")
      return {
        ...q,
        status: approved ? "approved" : pending ? "pending" : "available",
        xp_awarded: approved?.xp_awarded || 0,
        requires_instagram: q.tier === "D",
        has_instagram: !!ig,
      }
    })

    return NextResponse.json({ quests: enriched, has_instagram: !!ig })
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to load quests"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
