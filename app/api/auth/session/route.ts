import { NextResponse } from "next/server"
import { getSessionUser } from "@/lib/auth/get-session-user"

/** GET /api/auth/session — current user from cookie JWT (no token refresh). */
export async function GET() {
  const { user, error } = await getSessionUser()
  if (error) {
    return NextResponse.json({ user: null })
  }
  if (!user) {
    return NextResponse.json({ user: null })
  }
  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      user_metadata: user.user_metadata,
    },
  })
}
