import type { User } from "@supabase/supabase-js"
import { SESSION_EXPIRED_ERROR } from "@/lib/auth/auth-errors"
import { decodeJwtPayload, isAccessTokenValid } from "@/lib/auth/jwt"
import { createServerClient } from "@/lib/supabase/server"

export type SessionState =
  | { kind: "authenticated"; user: User }
  | { kind: "expired" }
  | { kind: "none" }
  | { kind: "error"; error: Error }

export async function getSessionState(): Promise<SessionState> {
  const supabase = await createServerClient()
  const { data: { session }, error: sessionError } = await supabase.auth.getSession()

  if (sessionError) {
    return { kind: "error", error: sessionError }
  }

  if (!session?.user || !session.access_token) {
    return { kind: "none" }
  }

  const payload = decodeJwtPayload(session.access_token)
  if (!payload?.sub || !payload.exp) {
    return { kind: "none" }
  }

  if (!isAccessTokenValid(payload.exp)) {
    return { kind: "expired" }
  }

  return { kind: "authenticated", user: session.user }
}

export async function getSessionUser(): Promise<{ user: User | null; error: Error | null }> {
  const state = await getSessionState()

  switch (state.kind) {
    case "authenticated":
      return { user: state.user, error: null }
    case "error":
      return { user: null, error: state.error }
    case "expired":
    case "none":
      return { user: null, error: null }
  }
}

export function isSessionExpiredError(error: Error | null): boolean {
  return error?.message === SESSION_EXPIRED_ERROR
}
