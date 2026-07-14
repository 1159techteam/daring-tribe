/** Prefer a human username — never show a raw email address. */
export function displayUsername(user: {
  name?: string | null
  email?: string | null
}): string {
  const raw = (user.name || "").trim()
  if (raw && !raw.includes("@")) return raw
  if (raw.includes("@")) return raw.split("@")[0] || "Learner"
  const email = (user.email || "").trim()
  if (email.includes("@")) return email.split("@")[0] || "Learner"
  return "Learner"
}
