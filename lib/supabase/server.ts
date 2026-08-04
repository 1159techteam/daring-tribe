import { createServerClient as createSSRServerClient } from "@supabase/ssr"
import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import { getAuthCookieOptions } from "@/lib/supabase/cookie-options"

export async function createServerClient() {
  const cookieStore = await cookies()
  const sharedCookie = getAuthCookieOptions()
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  return createSSRServerClient(url, anon, {
    cookieOptions: sharedCookie,
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, { ...sharedCookie, ...options })
          })
        } catch {
          // Called from a Server Component — ignore
        }
      },
    },
  })
}

export function createServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error("Missing Supabase service role env")
  }
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}
