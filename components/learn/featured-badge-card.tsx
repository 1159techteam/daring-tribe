import { Award, BookOpen, Flame, Star, Trophy } from "lucide-react"
import { CadreStar } from "@/components/learn/cadre-star"

type BadgeInfo = {
  name: string
  description?: string
  badge_type?: string
  xp_value?: number
}

type Props = {
  badge: BadgeInfo
  cadreSlug?: string
  cadreName?: string
  className?: string
}

function badgeIcon(type?: string) {
  const t = (type || "").toLowerCase()
  if (t.includes("streak") || t.includes("daily")) return Flame
  if (t.includes("course")) return BookOpen
  if (t.includes("level") || t.includes("cadre")) return Star
  if (t.includes("trophy") || t.includes("win")) return Trophy
  return Award
}

/** LearnWeb3-inspired collectible badge card — Tribe cream / gold / brown */
export function FeaturedBadgeCard({ badge, cadreSlug, cadreName, className = "" }: Props) {
  const Icon = badgeIcon(badge.badge_type)
  const typeLabel = (badge.badge_type || "Badge").toUpperCase()

  return (
    <div
      className={`relative w-full max-w-[220px] shrink-0 overflow-hidden bg-[#3E2C1C] p-3 shadow-[0_16px_40px_rgba(62,44,28,0.28)] ${className}`}
      style={{
        clipPath:
          "polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 0 100%)",
        borderRadius: "14px 0 14px 14px",
      }}
    >
      <div
        className="relative overflow-hidden bg-gradient-to-br from-[#E8C547] via-[#D4AF37] to-[#8D5B3E] p-4"
        style={{
          clipPath:
            "polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 0 100%)",
          borderRadius: "10px 0 10px 10px",
          minHeight: "260px",
        }}
      >
        {/* soft pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-32deg, transparent 0 10px, rgba(62,44,28,0.15) 10px 12px)",
          }}
        />

        <p className="relative text-[10px] font-bold uppercase tracking-[0.18em] text-[#3E2C1C]">
          {typeLabel} BADGE
        </p>

        {/* Icon well with hex vibe */}
        <div className="relative mx-auto mt-5 flex h-28 w-[85%] items-center justify-center bg-[#3E2C1C]">
          <div
            className="flex h-20 w-20 items-center justify-center border-2 border-[#D4AF37]/80"
            style={{
              clipPath:
                "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
            }}
          >
            <Icon className="h-9 w-9 text-[#D4AF37]" strokeWidth={1.6} />
          </div>
        </div>

        <div className="relative mt-5">
          <p className="text-xl font-bold uppercase tracking-wide text-[#3E2C1C]">
            {typeLabel}
          </p>
          <div className="mt-1 flex items-center gap-1.5">
            {cadreSlug ? <CadreStar slug={cadreSlug} size={16} /> : null}
            <p className="text-sm font-bold uppercase tracking-wider text-[#3E2C1C]/90">
              {cadreName || "Learner"}
            </p>
          </div>
          <p className="mt-3 line-clamp-2 text-[10px] font-medium uppercase tracking-wide text-[#3E2C1C]/75">
            {badge.name}
          </p>
        </div>
      </div>
    </div>
  )
}

export function BadgeChip({
  name,
  badgeType,
  active,
}: {
  name: string
  badgeType?: string
  active?: boolean
}) {
  const Icon = badgeIcon(badgeType)
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
        active
          ? "border-[#D4AF37]/50 bg-[#D4AF37]/15 text-[#3E2C1C]"
          : "border-[#3E2C1C]/10 bg-[#F5F5F0] text-[#3E2C1C]"
      }`}
    >
      <Icon className="h-3.5 w-3.5 text-[#D4AF37]" />
      {name}
    </span>
  )
}
