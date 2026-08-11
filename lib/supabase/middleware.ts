import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
import { getSessionEpoch, SESSION_EPOCH_COOKIE } from "@/lib/auth/session-epoch"
import { getAuthCookieOptions } from "@/lib/supabase/cookie-options"

/**
 * Daring Tribe reads the shared session from cookies only.
 * Buddy owns token refresh to avoid refresh-token races on .1159realty.com.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const cookieOptions = getAuthCookieOptions()
  const sessionEpoch = getSessionEpoch()
  const storedEpoch = request.cookies.get(SESSION_EPOCH_COOKIE)?.value

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

  await supabase.auth.getSession()

  supabaseResponse.cookies.set(SESSION_EPOCH_COOKIE, sessionEpoch, {
    ...cookieOptions,
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  })

  return supabaseResponse
}
