"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/providers/auth-provider"
import { LevelUpModal } from "@/components/learn/level-up-modal"
import { Zap, Award, Star, Trophy, BookOpen, GraduationCap, Flame } from "lucide-react"

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
      <main className="min-h-screen bg-[#1a1410] text-[#F5F5F0]">
        <Navigation />
        <p className="p-16 text-center text-stone-400">Loading profile…</p>
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
  const displayName = profile.user.name || profile.user.email || "Learner"

  return (
    <main className="min-h-screen bg-[#1a1410] text-[#F5F5F0]">
      <Navigation />
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#2A2421] to-[#1a1410]">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4 flex h-28 w-28 items-center justify-center rounded-full border-4 border-[#D4AF37] bg-[#3E2C1C] text-3xl font-bold text-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.35)]">
              {displayName.slice(0, 1).toUpperCase()}
            </div>
            <h1 className="font-display text-3xl font-bold md:text-4xl">{displayName}</h1>
            {profile.label && (
              <span
                className="mt-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: `${profile.label.color || "#D4AF37"}33`,
                  color: profile.label.color || "#D4AF37",
                }}
              >
                {profile.label.name}
              </span>
            )}

            <div className="mt-8 grid w-full max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
              <Stat icon={<Flame className="h-4 w-4 text-[#D4AF37]" />} label="Daily Streak" value={String(profile.stats.streak)} />
              <Stat icon={<Award className="h-4 w-4 text-[#D4AF37]" />} label="Badges" value={String(profile.stats.badges)} />
              <Stat icon={<Trophy className="h-4 w-4 text-[#D4AF37]" />} label="Cadre" value={profile.cadre.name} />
              <Stat icon={<Star className="h-4 w-4 text-[#D4AF37]" />} label="Level" value={String(profile.level.level)} />
            </div>

            <div className="mt-6 w-full max-w-3xl">
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#8D5B3E] transition-all"
                  style={{ width: `${Math.round(profile.level.progress * 100)}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-stone-300">
                {profile.level.xpToNextLevel.toLocaleString()} XP to Level {profile.level.level + 1}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button onClick={checkIn} className="bg-[#D4AF37] text-[#3E2C1C] font-bold hover:bg-[#D4AF37]/90">
                <Zap className="mr-2 h-4 w-4" /> Daily check-in
              </Button>
              <Button asChild variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10">
                <Link href="/learn">Continue learning</Link>
              </Button>
              <Button asChild variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10">
                <Link href="/leaderboard">Leaderboard</Link>
              </Button>
              <Button variant="ghost" className="text-stone-400" onClick={() => signOut()}>
                Sign out
              </Button>
            </div>
            {checkinMsg && <p className="mt-3 text-sm text-[#D4AF37]">{checkinMsg}</p>}
          </div>
        </div>
      </section>

      <section className="container mx-auto grid gap-8 px-4 py-12 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-2xl border border-white/10 bg-[#2A2421] p-6">
          <h2 className="font-display text-lg font-bold">Stats</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <Li icon={<Trophy className="h-4 w-4" />} label="All-time XP" value={profile.lifetime_xp.toLocaleString()} />
            <Li icon={<Zap className="h-4 w-4" />} label="Season XP" value={profile.season_xp.toLocaleString()} />
            <Li icon={<BookOpen className="h-4 w-4" />} label="Lessons" value={String(profile.stats.lessons)} />
            <Li icon={<GraduationCap className="h-4 w-4" />} label="Courses" value={String(profile.stats.courses)} />
            <Li icon={<Award className="h-4 w-4" />} label="Badges" value={String(profile.stats.badges)} />
          </ul>
        </aside>

        <div className="rounded-2xl border border-white/10 bg-[#2A2421] p-6 md:p-8">
          <h2 className="font-display text-lg font-bold">Featured Badge</h2>
          {featured?.learn_badges ? (
            <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-start">
              <div className="flex h-40 w-full max-w-[200px] flex-col items-center justify-center rounded-xl border border-[#D4AF37]/40 bg-[#3E2C1C] p-4 text-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                  {featured.learn_badges.badge_type || "Badge"}
                </span>
                <Award className="my-3 h-12 w-12 text-[#D4AF37]" />
                <span className="text-xs text-stone-400">ACHIEVEMENT</span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold">{featured.learn_badges.name}</h3>
                <p className="mt-2 text-stone-400">{featured.learn_badges.description}</p>
                {featured.learn_badges.xp_value != null && (
                  <p className="mt-4 inline-block rounded-lg border border-white/10 px-3 py-2 text-sm">
                    XP{" "}
                    <span className="font-bold text-[#D4AF37]">
                      {featured.learn_badges.xp_value.toLocaleString()}
                    </span>
                  </p>
                )}
              </div>
            </div>
          ) : (
            <p className="mt-4 text-stone-400">
              Complete your first lesson to earn badges.{" "}
              <Link href="/learn" className="text-[#D4AF37] underline">
                Start learning
              </Link>
            </p>
          )}

          {profile.badges.length > 1 && (
            <div className="mt-10">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-400">All badges</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {profile.badges.map((b) => (
                  <span
                    key={b.id}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-stone-200"
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
        onClose={() => setLevelUpOpen(false)}
      />
      <Footer />
    </main>
  )
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-4">
      <div className="flex items-center justify-center gap-1 text-stone-400">
        {icon}
        <span className="text-[10px] uppercase tracking-wider">{label}</span>
      </div>
      <p className="mt-1 text-lg font-bold md:text-xl">{value}</p>
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
    <li className="flex items-center justify-between gap-3 border-b border-white/5 pb-2">
      <span className="flex items-center gap-2 text-stone-400">
        {icon}
        {label}
      </span>
      <span className="font-semibold">{value}</span>
    </li>
  )
}
