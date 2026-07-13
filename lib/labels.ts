import { createServiceRoleClient } from "@/lib/supabase/server"

export const DARING_TRIBE_LABEL_NAME = "Daring Tribe"

/** Assign (or replace) the user's single label with Daring Tribe. */
export async function assignDaringTribeLabel(userId: string) {
  const admin = createServiceRoleClient()
  const { data: label, error: labelErr } = await admin
    .from("labels")
    .select("id")
    .eq("name", DARING_TRIBE_LABEL_NAME)
    .maybeSingle()

  if (labelErr || !label) {
    throw new Error(
      labelErr?.message ||
        `Label "${DARING_TRIBE_LABEL_NAME}" not found. Create it in Buddy admin first.`
    )
  }

  const { error } = await admin.from("user_labels").upsert(
    { user_id: userId, label_id: label.id },
    { onConflict: "user_id" }
  )
  if (error) throw new Error(error.message)
  return label.id as string
}
