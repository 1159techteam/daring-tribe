import { buddyCookieRefreshUrl } from "@/lib/auth/buddy-url"

const LOCK_NAME = "buddy-auth-refresh"

let recoveryScheduled = false

function navigateToBuddyRefresh(): void {
  if (recoveryScheduled) return
  recoveryScheduled = true
  window.location.href = buddyCookieRefreshUrl(window.location.href)
}

/** Redirect to Buddy cookie-refresh with cross-tab single-flight. */
export function redirectToBuddyCookieRefresh(): void {
  if (typeof window === "undefined" || recoveryScheduled) return

  if (typeof navigator !== "undefined" && navigator.locks) {
    navigator.locks.request(LOCK_NAME, () => {
      navigateToBuddyRefresh()
    }).catch(() => {
      navigateToBuddyRefresh()
    })
    return
  }

  navigateToBuddyRefresh()
}
