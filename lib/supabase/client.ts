import { createBrowserClient } from "@supabase/ssr"
import { getAuthCookieOptions } from "@/lib/supabase/cookie-options"

let client: ReturnType<typeof createBrowserClient> | null = null

export function createClient() {
  if (typeof window === "undefined") {
    throw new Error("Browser Supabase client only")
  }
  if (client) return client

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anon) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY")
  }

  client = createBrowserClient(url, anon, {
    cookieOptions: getAuthCookieOptions(),
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
      flowType: "pkce",
    },
  })
  return client
}
