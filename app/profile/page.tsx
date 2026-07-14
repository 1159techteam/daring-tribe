"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/providers/auth-provider"
import { LevelUpModal } from "@/components/learn/level-up-modal"
import { CadreStar } from "@/components/learn/cadre-star"
import { displayUsername } from "@/lib/learn/display-name"
import { Zap, Award, BookOpen, GraduationCap, Flame, Trophy } from "lucide-react"

type ProfilePayload = {
  user: { id: string; name?: string; email?: string }
  label?: { name: string; color?: string } | null
  season_xp: number
  lifetime_xp: number
  level: {
    level: number
    xpToNextLevel: number
    progress: number
  }
  cadre: { name: string; slug: string }
  badges: Array<{
    id: string
    is_featured?: boolean
    learn_badges: {
      name: string
      description?: string
      badge_type?: string
      xp_value?: number
    } | null
  }>
  stats: {
    lessons: number
    courses: number
    badges: number
    streak: number
  }
}

export default function ProfilePage() {
  const { user, loading: authLoading, signOut } = useAuth()
  const router = useRouter()
  const [profile, setProfile] = useState<ProfilePayload | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [checkinMsg, setCheckinMsg] = useState<string | null>(null)
  const [levelUpOpen, setLevelUpOpen] = useState(false)
  const [prevLevel, setPrevLevel] = useState<number | null>(null)

  const load = useCallback(async () => {
    const res = await fetch("/api/profile")
    if (res.status === 401) {
      router.push("/login")
      return
    }
    const data = await res.json()
    if (!res.ok) {
      setError(data.error || "Failed to load profile")
      return
    }
    setProfile(data)
    setPrevLevel((prev) => {
      if (prev != null && data.level.level > prev) setLevelUpOpen(true)
      return data.level.level
    })
  }, [router])

  useEffect(() => {
    if (authLoading) return
    if (!user) {
      router.push("/login")
      return
    }
    load()
  }, [user, authLoading, router, load])

  async function checkIn() {
    setCheckinMsg(null)
    const res = await fetch("/api/learn/checkin", { method: "POST" })
    const data = await res.json()
    if (!res.ok) {
      setCheckinMsg(data.error || "Check-in failed")
      return
    }
    if (data.already_checked_in) {
      setCheckinMsg(`Already checked in today. Streak: ${data.streak}`)
    } else {
      setCheckinMsg(`+${data.xp_awarded} XP · Streak ${data.streak}`)
      await load()
    }
  }

  if (authLoading || (!profile && !error)) {
    return (
      <main className="min-h-screen bg-[#F5F5F0]">
        <Navigation />
        <p className="p-16 text-center text-[#6D5D56]">Loading profile…</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#F5F5F0]">
        <Navigation />
        <p className="p-16 text-center text-red-700">{error}</p>
        <Footer />
      </main>
    )
  }

  if (!profile) return null

  const featured =
    profile.badges.find((b) => b.is_featured) || profile.badges[0] || null
  const displayName = displayUsername(profile.user)
  const initial = displayName.slice(0, 1).toUpperCase()
  const levelStars = Math.min(3, Math.max(1, Math.ceil(profile.level.level / 15)))

  return (
    <main className="min-h-screen bg-[#F5F5F0] text-[#3E2C1C]">
      <Navigation />

      <section className="relative">
        {/* Banner — LearnWeb3-style speed lines, warm palette */}
        <div className="relative h-40 overflow-hidden md:h-48">
          <div className="absolute inset-0 bg-[#2A1F18]" />
          <div
            className="absolute inset-y-0 right-0 w-[68%]"
            style={{
              background:
                "linear-gradient(118deg, transparent 0%, #6B4423 18%, #8D5B3E 48%, #C9A227 78%, #E8C547 100%)",
              clipPath: "polygon(18% 100%, 100% 0, 100% 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-[62%] opacity-50"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-32deg, transparent 0 14px, rgba(255,255,255,0.14) 14px 20px)",
            }}
          />
        </div>

        {/* Hex avatar overlapping banner / strip */}
        <div className="relative z-10 mx-auto -mt-16 flex max-w-5xl justify-center px-4 md:-mt-[4.5rem]">
          <div className="relative h-[7.5rem] w-[6.75rem] drop-shadow-[0_10px_28px_rgba(62,44,28,0.35)] md:h-[8.75rem] md:w-[7.75rem]">
            <div
              className="absolute inset-0 bg-[#C9A227]"
              style={{
                clipPath:
                  "polygon(50% 0%, 100% 22%, 100% 78%, 50% 100%, 0% 78%, 0% 22%)",
              }}
            />
            <div
              className="absolute inset-[4px] flex items-center justify-center bg-[#3E2C1C] text-3xl font-bold text-[#D4AF37] md:text-4xl"
              style={{
                clipPath:
                  "polygon(50% 0%, 100% 22%, 100% 78%, 50% 100%, 0% 78%, 0% 22%)",
              }}
            >
              {initial}
            </div>
          </div>
        </div>

        {/* Identity strip */}
        <div className="border-b border-[#3E2C1C]/10 bg-white">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-y-5 px-4 pb-2 pt-5 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-0 md:pb-3 md:pt-4">
            <div className="order-2 flex divide-x divide-[#3E2C1C]/10 md:order-1 md:justify-start">
              <Metric
                label="Daily Streak"
                value={String(profile.stats.streak)}
                icon={<Flame className="h-4 w-4 text-[#D4AF37]" />}
                className="flex-1 px-4 md:px-6"
              />
              <Metric
                label="Badges"
                value={String(profile.stats.badges)}
                icon={<Award className="h-4 w-4 text-[#D4AF37]" />}
                className="flex-1 px-4 md:px-6"
              />
            </div>

            <div className="order-1 col-span-2 flex flex-col items-center px-4 text-center md:order-2 md:col-span-1 md:min-w-[220px]">
              <div className="flex items-center gap-2.5">
                <h1 className="font-display text-2xl font-bold tracking-tight md:text-[1.75rem]">
                  {displayName}
                </h1>
                <CadreStar
                  slug={profile.cadre.slug}
                  size={30}
                  title={`${profile.cadre.name} star`}
                />
              </div>
              {profile.label && (
                <span
                  className="mt-2 rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: `${profile.label.color || "#D4AF37"}22`,
                    color: profile.label.color || "#8D5B3E",
                  }}
                >
                  {profile.label.name}
                </span>
              )}
            </div>

            <div className="order-3 flex divide-x divide-[#3E2C1C]/10 md:justify-end">
              <Metric
                label="Cadre"
                value={profile.cadre.name.toUpperCase()}
                icon={<CadreStar slug={profile.cadre.slug} size={18} />}
                className="flex-1 px-4 md:px-6 md:text-right"
                valueClassName="uppercase tracking-wide"
              />
              <Metric
                label="Level"
                value={String(profile.level.level)}
                icon={
                  <span className="flex items-center gap-0.5" aria-hidden>
                    {Array.from({ length: levelStars }).map((_, i) => (
                      <CadreStar key={i} slug="leader" size={12} />
                    ))}
                  </span>
                }
                className="flex-1 px-4 md:px-6 md:text-right"
              />
            </div>
          </div>

          {/* Roomier XP bar */}
          <div className="mx-auto max-w-5xl px-4 pb-8 pt-6">
            <div className="h-3.5 overflow-hidden rounded-full bg-[#3E2C1C]/08 shadow-inner md:h-4">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] via-[#C9A227] to-[#8D5B3E] transition-all duration-500"
                style={{ width: `${Math.round(profile.level.progress * 100)}%` }}
              />
            </div>
            <p className="mt-3 text-center text-sm font-medium text-[#6D5D56]">
              {profile.level.xpToNextLevel.toLocaleString()} XP to Level {profile.level.level + 1}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            onClick={checkIn}
            className="bg-[#D4AF37] font-bold text-[#3E2C1C] hover:bg-[#D4AF37]/90"
          >
            <Zap className="mr-2 h-4 w-4" /> Daily check-in
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-[#3E2C1C]/20 text-[#3E2C1C] hover:bg-[#3E2C1C]/5"
          >
            <Link href="/learn">Continue learning</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-[#3E2C1C]/20 text-[#3E2C1C] hover:bg-[#3E2C1C]/5"
          >
            <Link href="/leaderboard">Leaderboard</Link>
          </Button>
          <Button variant="ghost" className="text-[#6D5D56]" onClick={() => signOut()}>
            Sign out
          </Button>
        </div>
        {checkinMsg && (
          <p className="mt-3 text-center text-sm font-medium text-[#8D5B3E]">{checkinMsg}</p>
        )}
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-4 pb-16 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl border border-[#3E2C1C]/10 bg-white p-6 shadow-sm">
          <h2 className="font-display text-lg font-bold">Stats</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <Li icon={<Trophy className="h-4 w-4" />} label="All-time XP" value={profile.lifetime_xp.toLocaleString()} />
            <Li icon={<Zap className="h-4 w-4" />} label="Season XP" value={profile.season_xp.toLocaleString()} />
            <Li icon={<BookOpen className="h-4 w-4" />} label="Lessons" value={String(profile.stats.lessons)} />
            <Li icon={<GraduationCap className="h-4 w-4" />} label="Courses" value={String(profile.stats.courses)} />
            <Li icon={<Award className="h-4 w-4" />} label="Badges" value={String(profile.stats.badges)} />
          </ul>
        </aside>

        <div className="rounded-2xl border border-[#3E2C1C]/10 bg-white p-6 shadow-sm md:p-8">
          <h2 className="font-display text-lg font-bold">Featured Badge</h2>
          {featured?.learn_badges ? (
            <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-start">
              <div className="flex h-40 w-full max-w-[200px] flex-col items-center justify-center rounded-xl border border-[#D4AF37]/40 bg-[#F5F5F0] p-4 text-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8D5B3E]">
                  {featured.learn_badges.badge_type || "Badge"}
                </span>
                <Award className="my-3 h-12 w-12 text-[#D4AF37]" />
                <span className="text-xs text-[#6D5D56]">ACHIEVEMENT</span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold">{featured.learn_badges.name}</h3>
                <p className="mt-2 text-[#6D5D56]">{featured.learn_badges.description}</p>
                {featured.learn_badges.xp_value != null && (
                  <p className="mt-4 inline-block rounded-lg border border-[#3E2C1C]/10 bg-[#F5F5F0] px-3 py-2 text-sm">
                    XP{" "}
                    <span className="font-bold text-[#8D5B3E]">
                      {featured.learn_badges.xp_value.toLocaleString()}
                    </span>
                  </p>
                )}
              </div>
            </div>
          ) : (
            <p className="mt-4 text-[#6D5D56]">
              Complete your first lesson to earn badges.{" "}
              <Link href="/learn" className="font-semibold text-[#8D5B3E] underline">
                Start learning
              </Link>
            </p>
          )}

          {profile.badges.length > 1 && (
            <div className="mt-10">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#6D5D56]">All badges</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {profile.badges.map((b) => (
                  <span
                    key={b.id}
                    className="rounded-full border border-[#3E2C1C]/10 bg-[#F5F5F0] px-3 py-1 text-xs text-[#3E2C1C]"
                  >
                    {b.learn_badges?.name || "Badge"}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <LevelUpModal
        open={levelUpOpen}
        level={profile.level.level}
        xpToNext={profile.level.xpToNextLevel}
        cadreName={profile.cadre.name}
        cadreSlug={profile.cadre.slug}
        onClose={() => setLevelUpOpen(false)}
      />
      <Footer />
    </main>
  )
}

function Metric({
  label,
  value,
  icon,
  className = "",
  valueClassName = "",
}: {
  label: string
  value: string
  icon: React.ReactNode
  className?: string
  valueClassName?: string
}) {
  return (
    <div className={`min-w-0 text-center md:text-left ${className}`}>
      <p className="text-[10px] font-bold uppercase tracking-wider text-[#6D5D56]">{label}</p>
      <div
        className={`mt-1.5 flex items-center justify-center gap-1.5 md:justify-start ${valueClassName.includes("right") || className.includes("text-right") ? "md:justify-end" : ""}`}
      >
        <span className={`text-xl font-bold leading-none md:text-2xl ${valueClassName}`}>
          {value}
        </span>
        {icon}
      </div>
    </div>
  )
}

function Li({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <li className="flex items-center justify-between gap-3 border-b border-[#3E2C1C]/5 pb-2">
      <span className="flex items-center gap-2 text-[#6D5D56]">
        {icon}
        {label}
      </span>
      <span className="font-semibold">{value}</span>
    </li>
  )
}
