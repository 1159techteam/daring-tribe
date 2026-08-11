import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
import { buddyCookieRefreshUrl } from "@/lib/auth/buddy-url"
import { getSessionEpoch, SESSION_EPOCH_COOKIE } from "@/lib/auth/session-epoch"
import { decodeJwtPayload, isAccessTokenValid } from "@/lib/auth/jwt"
import { getAuthCookieOptions } from "@/lib/supabase/cookie-options"

const AUTH_PATHS = ["/login", "/logout", "/signup", "/forgot-password", "/reset-password"]

/**
 * Daring Tribe reads the shared session from cookies only.
 * Buddy owns token refresh; expired JWTs redirect to Buddy for a single refresh.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const cookieOptions = getAuthCookieOptions()
  const sessionEpoch = getSessionEpoch()
  const storedEpoch = request.cookies.get(SESSION_EPOCH_COOKIE)?.value
  const pathname = request.nextUrl.pathname

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions,
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, { ...cookieOptions, ...options })
          )
        },
      },
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    }
  )

  if (storedEpoch && storedEpoch !== sessionEpoch) {
    await supabase.auth.signOut()
  }

  const { data: { session } } = await supabase.auth.getSession()

  const isAuthPath = AUTH_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))
  if (
    session?.access_token &&
    !isAuthPath &&
    !pathname.startsWith("/api/")
  ) {
    const payload = decodeJwtPayload(session.access_token)
    if (payload?.exp && !isAccessTokenValid(payload.exp)) {
      return NextResponse.redirect(buddyCookieRefreshUrl(request.url))
    }
  }

  supabaseResponse.cookies.set(SESSION_EPOCH_COOKIE, sessionEpoch, {
    ...cookieOptions,
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  })

  supabaseResponse.headers.set("Cache-Control", "private, no-store")

  return supabaseResponse
}
