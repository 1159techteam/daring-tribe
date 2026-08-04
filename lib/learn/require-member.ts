import { NextResponse } from "next/server"
import { DARING_TRIBE_LABEL_NAME } from "@/lib/labels"
import { createServerClient, createServiceRoleClient } from "@/lib/supabase/server"

type MemberResult =
  | { user: { id: string }; error?: never }
  | { error: NextResponse; user?: never }

/** Authenticated user with the Daring Tribe label (learn member). */
export async function requireLearnMember(): Promise<MemberResult> {
  const supabase = await createServerClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) }
  }

  const admin = createServiceRoleClient()
  const { data: row } = await admin
    .from("user_labels")
    .select("labels(name)")
    .eq("user_id", user.id)
    .maybeSingle()

  const labelName = (row as { labels?: { name: string } | null } | null)?.labels?.name
  if (labelName !== DARING_TRIBE_LABEL_NAME) {
    return {
      error: NextResponse.json({ error: "Member access required" }, { status: 403 }),
    }
  }

  return { user: { id: user.id } }
}
