export type JwtPayload = {
  sub?: string
  exp?: number
}

export function decodeJwtPayload(accessToken: string): JwtPayload | null {
  try {
    const parts = accessToken.split('.')
    if (parts.length !== 3) return null
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=')
    const json = Buffer.from(padded, 'base64').toString('utf8')
    return JSON.parse(json) as JwtPayload
  } catch {
    return null
  }
}

/** True when JWT is still valid for API use (no proactive buffer). */
export function isAccessTokenValid(exp: number, bufferSeconds = 0): boolean {
  return exp * 1000 > Date.now() + bufferSeconds * 1000
}

/** True when middleware should redirect to Buddy cookie-refresh before hard expiry. */
export function shouldProactivelyRefresh(exp: number, bufferSeconds = 60): boolean {
  return !isAccessTokenValid(exp, bufferSeconds)
}
