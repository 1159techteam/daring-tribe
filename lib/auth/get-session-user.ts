import type { User } from "@supabase/supabase-js"
import { decodeJwtPayload, isAccessTokenValid } from "@/lib/auth/jwt"
import { createServerClient } from "@/lib/supabase/server"

/**
 * Read session from cookies only. Never refreshes tokens (Buddy owns refresh for SSO).
 * Returns null when unauthenticated or access token is expired.
 */
export async function getSessionUser(): Promise<{ user: User | null; error: Error | null }> {
  const supabase = await createServerClient()
  const { data: { session }, error: sessionError } = await supabase.auth.getSession()

  if (sessionError) {
    return { user: null, error: sessionError }
  }

  if (!session?.user || !session.access_token) {
    return { user: null, error: null }
  }

  const payload = decodeJwtPayload(session.access_token)
  if (!payload?.sub || !payload.exp || !isAccessTokenValid(payload.exp)) {
    return { user: null, error: null }
  }

  return { user: session.user, error: null }
}
