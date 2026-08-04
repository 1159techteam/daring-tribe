import { createServiceRoleClient } from "@/lib/supabase/server"

function certificateCode(userId: string, courseId: string): string {
  const raw = `${userId.slice(0, 8)}${courseId.slice(0, 8)}${Date.now().toString(36)}`
  return `DT-${raw.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 16)}`
}

/** Issue a course certificate if one does not already exist. Returns the row or null. */
export async function issueCourseCertificate(params: {
  userId: string
  courseId: string
  courseTitle: string
}) {
  const admin = createServiceRoleClient()

  const { data: existing } = await admin
    .from("learn_certificates")
    .select("id, certificate_code, title, issued_at, course_id")
    .eq("user_id", params.userId)
    .eq("course_id", params.courseId)
    .maybeSingle()

  if (existing) return existing

  const { data, error } = await admin
    .from("learn_certificates")
    .insert({
      user_id: params.userId,
      course_id: params.courseId,
      title: params.courseTitle,
      certificate_code: certificateCode(params.userId, params.courseId),
    })
    .select("id, certificate_code, title, issued_at, course_id")
    .single()

  if (error) {
    // Table may not be migrated yet — don't fail lesson completion
    console.warn("issueCourseCertificate:", error.message)
    return null
  }
  return data
}
