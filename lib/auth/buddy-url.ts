/** Buddy base URL for SSO cookie refresh (Daring Tribe never refreshes tokens). */
export function getBuddyUrl(): string {
  const configured = process.env.NEXT_PUBLIC_BUDDY_URL?.trim()
  if (configured) return configured.replace(/\/$/, "")
  return "https://buddy.1159realty.com"
}

export function buddyCookieRefreshUrl(returnTo: string): string {
  const buddy = getBuddyUrl()
  return `${buddy}/auth/cookie-refresh?returnTo=${encodeURIComponent(returnTo)}`
}
