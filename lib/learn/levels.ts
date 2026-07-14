/** Level / cadre helpers — all-time XP based, 2go-style star cadres. */

export type LevelInfo = {
  level: number
  xpIntoLevel: number
  xpForNextLevel: number
  xpToNextLevel: number
  progress: number
}

export type CadreTier = {
  slug: string
  name: string
  min_level: number
  sort_order: number
}

/**
 * Exact 2go star ladder colors (from official rank list).
 * Novice red → Ultimate aquamarine — not grey/black.
 */
export const CADRE_STAR_COLORS: Record<string, string> = {
  novice: "#E53935", // red
  amateur: "#5E35B1", // deep purple
  senior: "#C2185B", // magenta / pink-purple
  enthusiast: "#C0CA33", // lime
  professional: "#43A047", // green
  expert: "#1E88E5", // medium blue
  leader: "#00ACC1", // cyan / teal
  veteran: "#F9A825", // muted gold
  master: "#FDD835", // bright yellow
  ultimate: "#26A69A", // aquamarine / teal-white metal
}

/** Metallic companions for star gradients */
export const CADRE_STAR_METAL: Record<string, { highlight: string; mid: string; shade: string }> = {
  novice: { highlight: "#FF8A80", mid: "#E53935", shade: "#B71C1C" },
  amateur: { highlight: "#B39DDB", mid: "#5E35B1", shade: "#311B92" },
  senior: { highlight: "#F48FB1", mid: "#C2185B", shade: "#880E4F" },
  enthusiast: { highlight: "#E6EE9C", mid: "#C0CA33", shade: "#9E9D24" },
  professional: { highlight: "#81C784", mid: "#43A047", shade: "#2E7D32" },
  expert: { highlight: "#90CAF9", mid: "#1E88E5", shade: "#1565C0" },
  leader: { highlight: "#80DEEA", mid: "#00ACC1", shade: "#00838F" },
  veteran: { highlight: "#FFE082", mid: "#F9A825", shade: "#F57F17" },
  master: { highlight: "#FFF59D", mid: "#FDD835", shade: "#FBC02D" },
  ultimate: { highlight: "#E0F2F1", mid: "#26A69A", shade: "#00695C" },
}

export function getCadreStarColor(slug: string): string {
  return CADRE_STAR_COLORS[slug] || CADRE_STAR_COLORS.novice
}

export function getCadreStarMetal(slug: string) {
  return CADRE_STAR_METAL[slug] || CADRE_STAR_METAL.novice
}

/** Fallback if app_settings.learn_daily_checkin_xp is missing */
export const DAILY_CHECKIN_XP = 25

/** Fallback curve if DB thresholds missing: level n at (n-1)^2 * 100 XP */
export function xpRequiredForLevel(level: number): number {
  if (level <= 1) return 0
  return (level - 1) * (level - 1) * 100
}

export function getLevelFromXp(
  totalXp: number,
  thresholds?: { level: number; xp_required: number }[]
): LevelInfo {
  const xp = Math.max(0, totalXp || 0)
  let level = 1

  if (thresholds && thresholds.length > 0) {
    const sorted = [...thresholds].sort((a, b) => a.level - b.level)
    for (const row of sorted) {
      if (xp >= row.xp_required) level = row.level
      else break
    }
    const currentReq =
      sorted.find((t) => t.level === level)?.xp_required ?? xpRequiredForLevel(level)
    const next =
      sorted.find((t) => t.level === level + 1)?.xp_required ??
      xpRequiredForLevel(level + 1)
    const xpIntoLevel = xp - currentReq
    const span = Math.max(1, next - currentReq)
    return {
      level,
      xpIntoLevel,
      xpForNextLevel: span,
      xpToNextLevel: Math.max(0, next - xp),
      progress: Math.min(1, xpIntoLevel / span),
    }
  }

  // Closed-form for fallback curve
  level = Math.max(1, Math.floor(Math.sqrt(xp / 100)) + 1)
  const currentReq = xpRequiredForLevel(level)
  const next = xpRequiredForLevel(level + 1)
  const xpIntoLevel = xp - currentReq
  const span = Math.max(1, next - currentReq)
  return {
    level,
    xpIntoLevel,
    xpForNextLevel: span,
    xpToNextLevel: Math.max(0, next - xp),
    progress: Math.min(1, xpIntoLevel / span),
  }
}

export function getCadreForLevel(level: number, tiers: CadreTier[]): CadreTier {
  const sorted = [...tiers].sort((a, b) => b.min_level - a.min_level)
  return (
    sorted.find((t) => level >= t.min_level) || {
      slug: "novice",
      name: "Novice",
      min_level: 1,
      sort_order: 1,
    }
  )
}

/** Classic 2go star ladder */
export const DEFAULT_CADRE_TIERS: CadreTier[] = [
  { slug: "novice", name: "Novice", min_level: 1, sort_order: 1 },
  { slug: "amateur", name: "Amateur", min_level: 5, sort_order: 2 },
  { slug: "senior", name: "Senior", min_level: 10, sort_order: 3 },
  { slug: "enthusiast", name: "Enthusiast", min_level: 18, sort_order: 4 },
  { slug: "professional", name: "Professional", min_level: 28, sort_order: 5 },
  { slug: "expert", name: "Expert", min_level: 40, sort_order: 6 },
  { slug: "leader", name: "Leader", min_level: 55, sort_order: 7 },
  { slug: "veteran", name: "Veteran", min_level: 70, sort_order: 8 },
  { slug: "master", name: "Master", min_level: 85, sort_order: 9 },
  { slug: "ultimate", name: "Ultimate", min_level: 100, sort_order: 10 },
]
