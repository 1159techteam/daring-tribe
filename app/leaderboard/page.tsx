"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CadreStar } from "@/components/learn/cadre-star"

type Row = {
  rank: number
  name: string
  lifetime_xp: number
  level: number
  cadre: string
  cadre_slug: string
}

export default function LeaderboardPage() {
  const [rows, setRows] = useState<Row[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/learn/leaderboard")
      .then(async (res) => {
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || "Failed")
        setRows(data.leaderboard || [])
      })
      .catch((e) => setError(e.message))
  }, [])

  return (
    <main className="min-h-screen bg-[#F5F5F0]">
      <Navigation />
      <section className="container mx-auto px-4 py-12">
        <h1 className="font-display text-4xl font-bold text-[#3E2C1C]">Cadre Leaderboard</h1>
        <p className="mt-2 text-[#6D5D56]">
          Ranked by all-time XP — climb the 2go star ladder.{" "}
          <Link href="/profile" className="text-[#8D5B3E] underline">
            View your profile
          </Link>
        </p>
        {error && <p className="mt-6 text-red-700">{error}</p>}
        <div className="mt-8 overflow-hidden rounded-2xl border border-[#3E2C1C]/10 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#3E2C1C] text-[#F5F5F0]">
              <tr>
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">Learner</th>
                <th className="px-4 py-3 font-medium">Cadre</th>
                <th className="px-4 py-3 font-medium">Level</th>
                <th className="px-4 py-3 font-medium">XP</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.rank} className="border-t border-[#3E2C1C]/5">
                  <td className="px-4 py-3 font-semibold text-[#D4AF37]">{r.rank}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-2 font-medium text-[#3E2C1C]">
                      {r.name}
                      <CadreStar slug={r.cadre_slug || "novice"} size={16} title={r.cadre} />
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 font-bold tracking-wide text-[#3E2C1C]">
                      <CadreStar slug={r.cadre_slug || "novice"} size={14} />
                      {r.cadre}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#3E2C1C]">{r.level}</td>
                  <td className="px-4 py-3 text-[#3E2C1C]">{r.lifetime_xp.toLocaleString()}</td>
                </tr>
              ))}
              {!error && rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-[#6D5D56]">
                    No rankings yet — be the first to earn XP.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      <Footer />
    </main>
  )
}
