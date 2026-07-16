/** Level / cadre helpers — all-time XP based, Tribe cadre ladder. */

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
 * Star colors for Scout → Elite.
 * Bronze–Ascendant follow Valorant rank palette; early ranks + Elite are Tribe originals.
 */
export const CADRE_STAR_COLORS: Record<string, string> = {
  scout: "#6B8F5E", // olive — field scout
  spartan: "#C62828", // warrior crimson
  challenger: "#E65100", // competitive orange
  "bronze-beginner": "#A36A3E", // Valorant bronze
  "silver-achiever": "#8A949E", // Valorant silver
  "gold-champion": "#E8B339", // Valorant gold
  "platinum-trailblazer": "#4BA7A7", // Valorant platinum teal
  diamond: "#C79CF2", // Valorant diamond lavender
  ascendant: "#24A56A", // Valorant ascendant green
  elite: "#7C3AED", // royal violet — top rank
}

/** Metallic companions for star gradients */
export const CADRE_STAR_METAL: Record<string, { highlight: string; mid: string; shade: string }> = {
  scout: { highlight: "#A8C49A", mid: "#6B8F5E", shade: "#3E5C34" },
  spartan: { highlight: "#EF9A9A", mid: "#C62828", shade: "#7F1515" },
  challenger: { highlight: "#FFB74D", mid: "#E65100", shade: "#BF360C" },
  "bronze-beginner": { highlight: "#D4A574", mid: "#A36A3E", shade: "#6B4423" },
  "silver-achiever": { highlight: "#E8ECF0", mid: "#8A949E", shade: "#5A636D" },
  "gold-champion": { highlight: "#FFE082", mid: "#E8B339", shade: "#B8860B" },
  "platinum-trailblazer": { highlight: "#A5E0DE", mid: "#4BA7A7", shade: "#2A6B6B" },
  diamond: { highlight: "#E8D5FF", mid: "#C79CF2", shade: "#7B5BA8" },
  ascendant: { highlight: "#7DDBAB", mid: "#24A56A", shade: "#0F6B40" },
  elite: { highlight: "#C4B5FD", mid: "#7C3AED", shade: "#4C1D95" },
}

export function getCadreStarColor(slug: string): string {
  return CADRE_STAR_COLORS[slug] || CADRE_STAR_COLORS.scout
}

export function getCadreStarMetal(slug: string) {
  return CADRE_STAR_METAL[slug] || CADRE_STAR_METAL.scout
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
      slug: "scout",
      name: "Scout",
      min_level: 1,
      sort_order: 1,
    }
  )
}

/** Tribe cadre ladder: Scout → Elite */
export const DEFAULT_CADRE_TIERS: CadreTier[] = [
  { slug: "scout", name: "Scout", min_level: 1, sort_order: 1 },
  { slug: "spartan", name: "Spartan", min_level: 5, sort_order: 2 },
  { slug: "challenger", name: "Challenger", min_level: 10, sort_order: 3 },
  { slug: "bronze-beginner", name: "Bronze Beginner", min_level: 18, sort_order: 4 },
  { slug: "silver-achiever", name: "Silver Achiever", min_level: 28, sort_order: 5 },
  { slug: "gold-champion", name: "Gold Champion", min_level: 40, sort_order: 6 },
  { slug: "platinum-trailblazer", name: "Platinum Trailblazer", min_level: 55, sort_order: 7 },
  { slug: "diamond", name: "Diamond", min_level: 70, sort_order: 8 },
  { slug: "ascendant", name: "Ascendant", min_level: 85, sort_order: 9 },
  { slug: "elite", name: "Elite", min_level: 100, sort_order: 10 },
]
