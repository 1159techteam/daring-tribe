import { createServiceRoleClient } from "@/lib/supabase/server"

export const DARING_TRIBE_LABEL_NAME = "Daring Tribe"

export type AssignDaringTribeLabelResult = {
  assigned: boolean
  label_id: string | null
  existing_label_id?: string
}

/**
 * Assign Daring Tribe only when the user has no label yet.
 * Buddy admin owns label changes; never overwrite Media Generalist (or any other role).
 */
export async function assignDaringTribeLabelIfUnset(
  userId: string
): Promise<AssignDaringTribeLabelResult> {
  const admin = createServiceRoleClient()

  const { data: existing, error: existingErr } = await admin
    .from("user_labels")
    .select("id, label_id")
    .eq("user_id", userId)
    .maybeSingle()

  if (existingErr) {
    throw new Error(existingErr.message)
  }

  if (existing) {
    return {
      assigned: false,
      label_id: existing.label_id,
      existing_label_id: existing.label_id,
    }
  }

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

  const { error } = await admin.from("user_labels").insert({
    user_id: userId,
    label_id: label.id,
  })

  if (error) throw new Error(error.message)

  return { assigned: true, label_id: label.id as string }
}
