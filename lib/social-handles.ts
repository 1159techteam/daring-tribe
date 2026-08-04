/** Normalize profile Instagram input for storage and admin verification links. */
export function normalizeInstagramHandle(raw: string | null | undefined): string | null {
  if (!raw) return null

  let handle = raw.trim()
  if (!handle) return null

  const urlMatch = handle.match(/instagram\.com\/([A-Za-z0-9._]+)/i)
  if (urlMatch) return urlMatch[1]

  if (handle.startsWith("@")) {
    handle = handle.slice(1).trim()
  }

  handle = handle.split(/\s+/)[0]
  return handle.length > 0 ? handle : null
}

export type SocialHandles = {
  instagram?: string
  tiktok?: string
  whatsapp?: string
  facebook?: string
}

export function sanitizeSocialHandles(input: unknown): SocialHandles {
  const src = (input && typeof input === "object" ? input : {}) as Record<string, unknown>
  const out: SocialHandles = {}
  for (const key of ["instagram", "tiktok", "whatsapp", "facebook"] as const) {
    const v = src[key]
    if (typeof v === "string" && v.trim()) out[key] = v.trim()
  }
  return out
}
