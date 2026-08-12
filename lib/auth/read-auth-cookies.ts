import type { User } from "@supabase/supabase-js"
import type { NextRequest } from "next/server"
import { decodeJwtPayload } from "@/lib/auth/jwt"

export type StoredAuthSession = {
  access_token: string
  refresh_token?: string
  expires_at?: number
  expires_in?: number
  token_type?: string
  user?: User
}

type CookieLike = { name: string; value: string }

function getAuthStorageKey(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!url) return "sb-auth-token"
  try {
    const ref = new URL(url).hostname.split(".")[0]
    return `sb-${ref}-auth-token`
  } catch {
    return "sb-auth-token"
  }
}

function isAuthTokenCookie(name: string, storageKey: string): boolean {
  return name === storageKey || name.startsWith(`${storageKey}.`)
}

function decodeCookiePayload(raw: string): string {
  if (raw.startsWith("base64-")) {
    return Buffer.from(raw.slice("base64-".length), "base64url").toString("utf8")
  }
  try {
    return decodeURIComponent(raw)
  } catch {
    return raw
  }
}

function combineAuthCookieChunks(cookies: CookieLike[], storageKey: string): string | null {
  const single = cookies.find((c) => c.name === storageKey)
  if (single?.value) return single.value

  const chunks: string[] = []
  for (let i = 0; ; i++) {
    const chunk = cookies.find((c) => c.name === `${storageKey}.${i}`)
    if (!chunk?.value) break
    chunks.push(chunk.value)
  }
  return chunks.length > 0 ? chunks.join("") : null
}

function parseStoredSession(raw: string): StoredAuthSession | null {
  try {
    const decoded = decodeCookiePayload(raw)
    const parsed = JSON.parse(decoded) as StoredAuthSession
    if (!parsed?.access_token || typeof parsed.access_token !== "string") return null
    return parsed
  } catch {
    return null
  }
}

/** Read Supabase auth session from cookies without touching Auth APIs. */
export function readStoredAuthSession(cookies: CookieLike[]): StoredAuthSession | null {
  const storageKey = getAuthStorageKey()
  const combined = combineAuthCookieChunks(cookies, storageKey)
  if (!combined) return null
  return parseStoredSession(combined)
}

export function readAccessTokenFromRequest(request: NextRequest): string | null {
  return readStoredAuthSession(request.cookies.getAll())?.access_token ?? null
}

export function userFromStoredSession(session: StoredAuthSession): User | null {
  const payload = decodeJwtPayload(session.access_token)
  const sub = payload?.sub ?? session.user?.id
  if (!sub) return null

  if (session.user?.id) {
    return session.user
  }

  return {
    id: sub,
    email:
      typeof (payload as { email?: string })?.email === "string"
        ? (payload as { email?: string }).email
        : undefined,
    user_metadata: {},
    app_metadata: {},
    aud: "authenticated",
    created_at: "",
  } as User
}

type CookieSetter = {
  set: (
    name: string,
    value: string,
    options: {
      path?: string
      maxAge?: number
      domain?: string
      sameSite?: "lax" | "strict" | "none"
      secure?: boolean
    }
  ) => void
}

/** Clear sb-*-auth-token* cookies locally (no Auth signOut /token calls). */
export function clearSupabaseAuthCookies(
  cookies: CookieLike[],
  setter: CookieSetter,
  cookieOptions: {
    path?: string
    domain?: string
    sameSite?: "lax" | "strict" | "none"
    secure?: boolean
  }
): void {
  const storageKey = getAuthStorageKey()
  const names = new Set<string>()

  for (const { name } of cookies) {
    if (isAuthTokenCookie(name, storageKey) || name.startsWith(`${storageKey}-`)) {
      names.add(name)
    }
  }

  names.add(storageKey)
  for (let i = 0; i < 5; i++) names.add(`${storageKey}.${i}`)
  names.add(`${storageKey}-code-verifier`)

  for (const name of names) {
    setter.set(name, "", {
      ...cookieOptions,
      path: cookieOptions.path ?? "/",
      maxAge: 0,
    })
  }
}
