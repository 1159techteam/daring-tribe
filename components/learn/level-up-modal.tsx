"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CadreStar } from "@/components/learn/cadre-star"

type Props = {
  open: boolean
  level: number
  xpToNext: number
  cadreName: string
  cadreSlug?: string
  onClose: () => void
}

export function LevelUpModal({ open, level, xpToNext, cadreName, cadreSlug, onClose }: Props) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md rounded-2xl border border-[#D4AF37]/40 bg-white p-8 text-center text-[#3E2C1C] shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-[#6D5D56] hover:text-[#3E2C1C]"
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="font-display text-3xl font-bold">Level Up!</h2>
        <div className="mx-auto mt-6 flex h-28 w-28 items-center justify-center rounded-full border-4 border-[#D4AF37] bg-[#F5F5F0]">
          <span className="text-3xl font-bold text-[#8D5B3E]">{level}</span>
        </div>
        <div className="mt-3 flex items-center justify-center gap-2">
          {cadreSlug ? <CadreStar slug={cadreSlug} size={22} /> : null}
          <p className="text-sm font-bold uppercase tracking-widest text-[#8D5B3E]">{cadreName}</p>
        </div>
        <p className="mt-4 text-[#6D5D56]">
          {xpToNext.toLocaleString()} XP to Level {level + 1}
        </p>
        <div className="mt-8 flex gap-3">
          <Button onClick={onClose} className="flex-1 bg-[#D4AF37] font-bold text-[#3E2C1C] hover:bg-[#D4AF37]/90">
            Awesome!
          </Button>
          <Button
            asChild
            variant="outline"
            className="flex-1 border-[#3E2C1C]/20 text-[#3E2C1C]"
            onClick={onClose}
          >
            <Link href="/profile">View Profile</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
