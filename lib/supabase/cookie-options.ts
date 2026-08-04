/**
 * Shared cookie options for cross-subdomain SSO (Buddy + Daring Tribe).
 * Set NEXT_PUBLIC_COOKIE_DOMAIN=.1159realty.com in production only.
 */
export function getAuthCookieOptions() {
  const domain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN?.trim()
  return {
    path: "/",
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    ...(domain ? { domain } : {}),
  }
}
