"use client"

import { useEffect, useId, useState } from "react"
import { Info, X } from "lucide-react"
import { CadreStar } from "@/components/learn/cadre-star"
import { DEFAULT_CADRE_TIERS } from "@/lib/learn/levels"

type Props = {
  currentSlug: string
  currentLevel: number
}

export function CadreRanksInfo({ currentSlug, currentLevel }: Props) {
  const [open, setOpen] = useState(false)
  const titleId = useId()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const tiers = [...DEFAULT_CADRE_TIERS].sort((a, b) => a.sort_order - b.sort_order)
  const currentIndex = tiers.findIndex((t) => t.slug === currentSlug)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-4 w-4 items-center justify-center rounded-full text-[#6D5D56] transition-colors hover:bg-[#3E2C1C]/10 hover:text-[#3E2C1C]"
        aria-label="View all cadre ranks"
        title="View all cadre ranks"
      >
        <Info className="h-3.5 w-3.5" strokeWidth={2.25} />
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/45 p-4 sm:items-center"
          onClick={() => setOpen(false)}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-[#3E2C1C]/10 bg-[#F5F5F0] text-[#3E2C1C] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 border-b border-[#3E2C1C]/10 px-4 py-3">
              <div>
                <h2 id={titleId} className="font-display text-lg font-bold">
                  Cadre ranks
                </h2>
                <p className="mt-0.5 text-xs text-[#6D5D56]">
                  You’re at level{" "}
                  <span className="font-semibold text-[#3E2C1C]">{currentLevel}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-1 text-[#6D5D56] hover:bg-[#3E2C1C]/10 hover:text-[#3E2C1C]"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <ol className="space-y-0.5 px-2.5 py-2">
              {tiers.map((tier, index) => {
                const isCurrent = tier.slug === currentSlug
                const unlocked = currentIndex >= 0 ? index <= currentIndex : tier.min_level <= currentLevel
                return (
                  <li
                    key={tier.slug}
                    className={`flex items-center gap-2 rounded-lg px-2 py-1.5 ${
                      isCurrent
                        ? "bg-[#D4AF37]/20 ring-1 ring-[#D4AF37]/50"
                        : unlocked
                          ? "bg-white/50"
                          : "opacity-50"
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                        isCurrent
                          ? "bg-[#D4AF37] text-[#3E2C1C]"
                          : "bg-[#3E2C1C]/10 text-[#6D5D56]"
                      }`}
                    >
                      {tier.sort_order}
                    </span>
                    <CadreStar slug={tier.slug} size={18} title={tier.name} />
                    <p className="min-w-0 flex-1 truncate text-sm font-semibold leading-none">
                      {tier.name}
                      {isCurrent ? (
                        <span className="ml-1.5 text-[9px] font-bold uppercase tracking-wider text-[#8D5B3E]">
                          You
                        </span>
                      ) : null}
                    </p>
                    <span className="shrink-0 text-[11px] tabular-nums text-[#6D5D56]">
                      Lv {tier.min_level}
                    </span>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      ) : null}
    </>
  )
}
