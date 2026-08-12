import { NextResponse, type NextRequest } from "next/server"
import { buddyCookieRefreshUrl } from "@/lib/auth/buddy-url"
import { getSessionEpoch, SESSION_EPOCH_COOKIE } from "@/lib/auth/session-epoch"
import { decodeJwtPayload, shouldProactivelyRefresh } from "@/lib/auth/jwt"
import {
  clearSupabaseAuthCookies,
  readAccessTokenFromRequest,
} from "@/lib/auth/read-auth-cookies"
import { getAuthCookieOptions } from "@/lib/supabase/cookie-options"

const AUTH_PATHS = ["/login", "/logout", "/signup", "/forgot-password", "/reset-password"]
const PUBLIC_PATHS = ["/", "/terms", "/privacy"]

/**
 * Daring Tribe reads the shared session from cookies only (no Auth API).
 * Buddy owns token refresh; near-expiry JWTs redirect to Buddy once.
 */
export async function updateSession(request: NextRequest) {
  const cookieOptions = getAuthCookieOptions()
  const sessionEpoch = getSessionEpoch()
  const storedEpoch = request.cookies.get(SESSION_EPOCH_COOKIE)?.value
  const pathname = request.nextUrl.pathname

  const isAuthPath = AUTH_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))
  const isPublicPath = PUBLIC_PATHS.some((p) => pathname === p)

  let response = NextResponse.next({
    request,
  })

  if (storedEpoch && storedEpoch !== sessionEpoch) {
    clearSupabaseAuthCookies(request.cookies.getAll(), response.cookies, cookieOptions)
    response.cookies.set(SESSION_EPOCH_COOKIE, sessionEpoch, {
      ...cookieOptions,
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    })
    response.headers.set("Cache-Control", "private, no-store")

    if (!isAuthPath && !pathname.startsWith("/api/")) {
      const loginUrl = new URL("/login", request.url)
      const redirect = NextResponse.redirect(loginUrl)
      clearSupabaseAuthCookies(request.cookies.getAll(), redirect.cookies, cookieOptions)
      redirect.cookies.set(SESSION_EPOCH_COOKIE, sessionEpoch, {
        ...cookieOptions,
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
      })
      redirect.headers.set("Cache-Control", "private, no-store")
      return redirect
    }

    return response
  }

  if (!isAuthPath && !isPublicPath && !pathname.startsWith("/api/")) {
    const accessToken = readAccessTokenFromRequest(request)
    if (accessToken) {
      const payload = decodeJwtPayload(accessToken)
      if (payload?.exp && shouldProactivelyRefresh(payload.exp)) {
        return NextResponse.redirect(buddyCookieRefreshUrl(request.url))
      }
    }
  }

  response.cookies.set(SESSION_EPOCH_COOKIE, sessionEpoch, {
    ...cookieOptions,
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  })

  response.headers.set("Cache-Control", "private, no-store")

  return response
}
