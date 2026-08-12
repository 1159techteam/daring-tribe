import type { User } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import { SESSION_EXPIRED_ERROR } from "@/lib/auth/auth-errors"
import { decodeJwtPayload, isAccessTokenValid } from "@/lib/auth/jwt"
import { readStoredAuthSession, userFromStoredSession } from "@/lib/auth/read-auth-cookies"

export type SessionState =
  | { kind: "authenticated"; user: User }
  | { kind: "expired" }
  | { kind: "none" }
  | { kind: "error"; error: Error }

/** Read session from cookies only. Never calls getSession()/getUser() (those refresh tokens). */
export async function getSessionState(): Promise<SessionState> {
  try {
    const cookieStore = await cookies()
    const session = readStoredAuthSession(cookieStore.getAll())

    if (!session?.access_token) {
      return { kind: "none" }
    }

    const payload = decodeJwtPayload(session.access_token)
    if (!payload?.sub || !payload.exp) {
      return { kind: "none" }
    }

    if (!isAccessTokenValid(payload.exp)) {
      return { kind: "expired" }
    }

    const user = userFromStoredSession(session)
    if (!user) {
      return { kind: "none" }
    }

    return { kind: "authenticated", user }
  } catch (error) {
    return {
      kind: "error",
      error: error instanceof Error ? error : new Error("Failed to read session"),
    }
  }
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
