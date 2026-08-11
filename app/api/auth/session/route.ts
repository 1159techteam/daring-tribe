import { NextResponse } from "next/server"
import { getSessionState } from "@/lib/auth/get-session-user"
import { SESSION_EXPIRED_ERROR } from "@/lib/auth/auth-errors"

/** GET /api/auth/session — current user from cookie JWT (no token refresh). */
export async function GET() {
  const state = await getSessionState()

  if (state.kind === "expired") {
    return NextResponse.json({ user: null, sessionExpired: true, error: SESSION_EXPIRED_ERROR })
  }

  if (state.kind === "error" || state.kind === "none") {
    return NextResponse.json({ user: null })
  }

  const user = state.user
  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      user_metadata: user.user_metadata,
    },
  })
}
