import { NextResponse } from "next/server"
import { createServerClient, createServiceRoleClient } from "@/lib/supabase/server"
import { getLifetimeXp, getSeasonXp } from "@/lib/learn/xp"
import {
  DEFAULT_CADRE_TIERS,
  getCadreForLevel,
  getLevelFromXp,
  type CadreTier,
} from "@/lib/learn/levels"
import { displayUsername } from "@/lib/learn/display-name"
import { sanitizeSocialHandles } from "@/lib/social-handles"

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
    const { data: profile } = await admin
      .from("users")
      .select("id, name, email, role, created_at, social_handles")
      .eq("id", user.id)
      .single()

    const { data: ul } = await admin
      .from("user_labels")
      .select("labels(id, name, color)")
      .eq("user_id", user.id)
      .maybeSingle()

    const [seasonXp, lifetimeXp] = await Promise.all([
      getSeasonXp(user.id),
      getLifetimeXp(user.id),
    ])

    const { data: thresholds } = await admin
      .from("learn_level_thresholds")
      .select("level, xp_required")
      .order("level", { ascending: true })

    const { data: tiers } = await admin
      .from("learn_cadre_tiers")
      .select("slug, name, min_level, sort_order")
      .order("sort_order", { ascending: true })

    const cadreTiers = (tiers as CadreTier[] | null)?.length
      ? (tiers as CadreTier[])
      : DEFAULT_CADRE_TIERS

    const levelInfo = getLevelFromXp(lifetimeXp, thresholds || undefined)
    const cadre = getCadreForLevel(levelInfo.level, cadreTiers)

    const { data: badges } = await admin
      .from("learn_user_badges")
      .select("id, earned_at, is_featured, learn_badges(id, slug, name, description, badge_type, xp_value, image_url)")
      .eq("user_id", user.id)
      .order("earned_at", { ascending: false })

    const { count: lessonsCompleted } = await admin
      .from("learn_lesson_progress")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)

    const { count: coursesCompleted } = await admin
      .from("learn_enrollments")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .not("completed_at", "is", null)

    const { data: lastCheckin } = await admin
      .from("learn_daily_activity")
      .select("activity_date, streak_count")
      .eq("user_id", user.id)
      .order("activity_date", { ascending: false })
      .limit(1)
      .maybeSingle()

    const label = (ul as { labels?: { id: string; name: string; color: string } | null } | null)
      ?.labels

    const nameSource = {
      name: profile?.name || (user.user_metadata?.name as string | undefined) || null,
      email: profile?.email || user.email || null,
    }
    const username = displayUsername(nameSource)

    return NextResponse.json({
      user: {
        id: profile?.id || user.id,
        name: username,
        email: nameSource.email,
        social_handles: sanitizeSocialHandles(profile?.social_handles),
      },
      label,
      season_xp: seasonXp,
      lifetime_xp: lifetimeXp,
      level: levelInfo,
      cadre,
      badges: badges || [],
      stats: {
        lessons: lessonsCompleted || 0,
        courses: coursesCompleted || 0,
        badges: badges?.length || 0,
        streak: lastCheckin?.streak_count || 0,
        last_checkin: lastCheckin?.activity_date || null,
      },
    })
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to load profile"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

/** PUT /api/profile — update name + social_handles (Buddy-shared fields) */
export async function PUT(request: Request) {
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
    const update: Record<string, unknown> = {}

    if (typeof body.name === "string" && body.name.trim()) {
      update.name = body.name.trim()
    }
    if (body.social_handles !== undefined) {
      update.social_handles = sanitizeSocialHandles(body.social_handles)
    }

    if (Object.keys(update).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 })
    }

    const admin = createServiceRoleClient()
    const { data: updated, error: updateError } = await admin
      .from("users")
      .update(update)
      .eq("id", user.id)
      .select("id, name, email, social_handles")
      .single()

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    return NextResponse.json({
      profile: {
        ...updated,
        name: displayUsername({ name: updated?.name, email: updated?.email }),
        social_handles: sanitizeSocialHandles(updated?.social_handles),
      },
      message: "Profile updated successfully",
    })
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to update profile"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
