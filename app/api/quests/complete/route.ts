import { NextResponse } from "next/server"
import { createServerClient, createServiceRoleClient } from "@/lib/supabase/server"
import { normalizeInstagramHandle } from "@/lib/social-handles"

/** POST /api/quests/complete — { quest_id } → pending review (Buddy admin approves XP) */
export async function POST(request: Request) {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    if (error || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const questId = body.quest_id as string | undefined
    if (!questId) {
      return NextResponse.json({ error: "Quest ID is required" }, { status: 400 })
    }

    const admin = createServiceRoleClient()
    const { data: quest, error: questError } = await admin
      .from("quests")
      .select("*")
      .eq("id", questId)
      .single()

    if (questError || !quest) {
      return NextResponse.json({ error: "Quest not found" }, { status: 404 })
    }

    if (!String(quest.title || "").startsWith("Tribe:")) {
      return NextResponse.json({ error: "Quest not available on Daring Tribe" }, { status: 403 })
    }

    if (new Date(quest.expiration_date) <= new Date()) {
      return NextResponse.json({ error: "Quest has expired" }, { status: 400 })
    }

    let instagramHandle: string | null = null
    if (quest.tier === "D") {
      const { data: profile } = await admin
        .from("users")
        .select("social_handles")
        .eq("id", user.id)
        .single()

      instagramHandle = normalizeInstagramHandle(
        (profile?.social_handles as { instagram?: string } | null)?.instagram
      )

      if (!instagramHandle) {
        return NextResponse.json(
          {
            error: "Add your Instagram handle on Edit Profile before submitting social quests.",
            code: "INSTAGRAM_REQUIRED",
          },
          { status: 400 }
        )
      }
    }

    const { data: existing } = await admin
      .from("quest_completions")
      .select("id, status")
      .eq("user_id", user.id)
      .eq("quest_id", questId)
      .in("status", ["pending", "approved", "auto-approved"])

    if ((existing || []).some((c) => c.status === "approved" || c.status === "auto-approved")) {
      return NextResponse.json(
        {
          error: "You have already completed this quest.",
          code: "ALREADY_COMPLETED_ONE_TIME",
        },
        { status: 400 }
      )
    }

    if ((existing || []).some((c) => c.status === "pending")) {
      return NextResponse.json(
        {
          error: "Quest completion already pending review",
          code: "PENDING_COMPLETION",
        },
        { status: 400 }
      )
    }

    const { data: completion, error: completionError } = await admin
      .from("quest_completions")
      .insert({
        user_id: user.id,
        quest_id: questId,
        status: "pending",
        xp_awarded: 0,
        instagram_handle: instagramHandle,
        completed_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (completionError) {
      return NextResponse.json({ error: completionError.message }, { status: 500 })
    }

    return NextResponse.json({
      completion,
      quest,
      message: "Submitted for review. XP is awarded after Buddy App admin approval.",
    })
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to submit quest"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
