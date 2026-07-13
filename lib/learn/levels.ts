/** Level / cadre helpers — all-time XP based (LearnWeb3-style). */

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
      slug: "recruit",
      name: "Recruit",
      min_level: 1,
      sort_order: 1,
    }
  )
}

export const DEFAULT_CADRE_TIERS: CadreTier[] = [
  { slug: "recruit", name: "Recruit", min_level: 1, sort_order: 1 },
  { slug: "scout", name: "Scout", min_level: 5, sort_order: 2 },
  { slug: "challenger", name: "Challenger", min_level: 10, sort_order: 3 },
  { slug: "elite", name: "Elite", min_level: 20, sort_order: 4 },
  { slug: "diamond", name: "Diamond", min_level: 35, sort_order: 5 },
  { slug: "grandmaster", name: "Grandmaster", min_level: 50, sort_order: 6 },
]

export const DAILY_CHECKIN_XP = 5
