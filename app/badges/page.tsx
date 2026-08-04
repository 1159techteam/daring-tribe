"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useAuth } from "@/components/providers/auth-provider"
import { FeaturedBadgeCard } from "@/components/learn/featured-badge-card"
import { Award } from "lucide-react"

type BadgeRow = {
  id: string
  earned_at: string
  is_featured?: boolean
  learn_badges: {
    name: string
    description?: string
    badge_type?: string
    xp_value?: number
  } | null
}

export default function BadgesPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [badges, setBadges] = useState<BadgeRow[]>([])
  const [cadre, setCadre] = useState<{ name: string; slug: string }>({
    name: "Scout",
    slug: "scout",
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoading) return
    if (!user) {
      router.push("/login")
      return
    }
    Promise.all([fetch("/api/learn/badges"), fetch("/api/profile")])
      .then(async ([bRes, pRes]) => {
        const bData = await bRes.json()
        const pData = await pRes.json()
        if (!bRes.ok) throw new Error(bData.error || "Failed to load badges")
        setBadges(bData.badges || [])
        if (pData.cadre) setCadre(pData.cadre)
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [user, authLoading, router])

  if (authLoading || loading) {
    return (
      <main className="min-h-screen bg-[#F5F5F0]">
        <Navigation />
        <p className="p-16 text-center text-[#6D5D56]">Loading badges…</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#F5F5F0] text-[#3E2C1C]">
      <Navigation />
      <section className="mx-auto max-w-5xl px-4 py-12">
        <Link href="/profile" className="text-sm text-[#6D5D56] hover:text-[#3E2C1C]">
          ← Back to profile
        </Link>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-4xl font-bold">Badges</h1>
            <p className="mt-2 text-[#6D5D56]">
              Everything you’ve earned in the School for the Daring.
            </p>
          </div>
          <Link
            href="/certificates"
            className="text-sm font-semibold text-[#8D5B3E] underline"
          >
            View certificates →
          </Link>
        </div>

        {error && <p className="mt-6 text-red-700">{error}</p>}

        {badges.length === 0 && !error ? (
          <div className="mt-12 rounded-2xl border border-[#3E2C1C]/10 bg-white p-10 text-center shadow-sm">
            <Award className="mx-auto h-12 w-12 text-[#D4AF37]/60" />
            <p className="mt-4 text-[#6D5D56]">
              No badges yet.{" "}
              <Link href="/learn" className="font-semibold text-[#8D5B3E] underline">
                Start learning
              </Link>{" "}
              to earn your first.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {badges.map((b) =>
              b.learn_badges ? (
                <div key={b.id} className="flex flex-col items-center">
                  <FeaturedBadgeCard
                    badge={b.learn_badges}
                    cadreSlug={cadre.slug}
                    cadreName={cadre.name}
                    className="w-full max-w-none"
                  />
                  <p className="mt-3 text-center text-xs text-[#6D5D56]">
                    Earned{" "}
                    {new Date(b.earned_at).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                    {b.is_featured ? " · Featured" : ""}
                  </p>
                </div>
              ) : null
            )}
          </div>
        )}
      </section>
      <Footer />
    </main>
  )
}
