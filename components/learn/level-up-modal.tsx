"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

type Props = {
  open: boolean
  level: number
  xpToNext: number
  cadreName: string
  onClose: () => void
}

export function LevelUpModal({ open, level, xpToNext, cadreName, onClose }: Props) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
      <div className="relative w-full max-w-md rounded-2xl border border-[#D4AF37]/40 bg-[#1a1410] p-8 text-center text-[#F5F5F0] shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-stone-400 hover:text-white"
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="font-display text-3xl font-bold">Level Up!</h2>
        <div className="mx-auto mt-6 flex h-28 w-28 items-center justify-center rounded-full border-4 border-[#D4AF37] bg-[#3E2C1C]">
          <span className="text-3xl font-bold text-[#D4AF37]">{level}</span>
        </div>
        <p className="mt-2 text-sm uppercase tracking-widest text-[#D4AF37]">{cadreName}</p>
        <p className="mt-4 text-stone-300">
          {xpToNext.toLocaleString()} XP to Level {level + 1} 🎉
        </p>
        <div className="mt-8 flex gap-3">
          <Button onClick={onClose} className="flex-1 bg-[#D4AF37] text-[#3E2C1C] font-bold hover:bg-[#D4AF37]/90">
            Awesome!
          </Button>
          <Button asChild variant="outline" className="flex-1 border-white/20 bg-white text-[#3E2C1C]" onClick={onClose}>
            <Link href="/profile">View Profile</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
