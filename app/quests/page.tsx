"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/providers/auth-provider"
import { ExternalLink, CheckCircle2, Clock } from "lucide-react"

type Quest = {
  id: string
  title: string
  description: string
  xp_reward: number
  link: string | null
  status: "available" | "pending" | "approved"
  has_instagram: boolean
  requires_instagram: boolean
}

export default function QuestsPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [quests, setQuests] = useState<Quest[]>([])
  const [hasInstagram, setHasInstagram] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [msg, setMsg] = useState<string | null>(null)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    const res = await fetch("/api/quests")
    const data = await res.json()
    if (!res.ok) {
      setError(data.error || "Failed to load quests")
      return
    }
    setQuests(data.quests || [])
    setHasInstagram(!!data.has_instagram)
    setError(null)
  }, [])

  useEffect(() => {
    if (authLoading) return
    if (!user) {
      router.push("/login")
      return
    }
    load().finally(() => setLoading(false))
  }, [user, authLoading, router, load])

  async function submit(questId: string) {
    setBusyId(questId)
    setMsg(null)
    setError(null)
    try {
      const res = await fetch("/api/quests/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quest_id: questId }),
      })
      const data = await res.json()
      if (!res.ok) {
        if (data.code === "INSTAGRAM_REQUIRED") {
          setError(data.error)
        } else {
          setError(data.error || "Submit failed")
        }
        return
      }
      setMsg(data.message || "Submitted for review")
      await load()
    } catch (e) {
      setError(e instanceof Error ? e.message : "Submit failed")
    } finally {
      setBusyId(null)
    }
  }

  if (authLoading || loading) {
    return (
      <main className="min-h-screen bg-[#F5F5F0]">
        <Navigation />
        <p className="p-16 text-center text-[#6D5D56]">Loading quests…</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#F5F5F0] text-[#3E2C1C]">
      <Navigation />
      <section className="mx-auto max-w-3xl px-4 py-12">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8D5B3E]">Starter XP</p>
        <h1 className="mt-2 font-display text-4xl font-bold">Social Quests</h1>
        <p className="mt-3 text-[#6D5D56]">
          Follow our pages, then submit for review. Admins approve in Buddy App and XP lands in your
          shared wallet.{" "}
          <Link href="/profile/edit" className="font-semibold text-[#8D5B3E] underline">
            Edit Profile
          </Link>{" "}
          to add your Instagram handle first.
        </p>

        {!hasInstagram && (
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            Add your Instagram on{" "}
            <Link href="/profile/edit" className="font-semibold underline">
              Edit Profile
            </Link>{" "}
            before submitting social quests.
          </div>
        )}

        {error && <p className="mt-4 text-sm text-red-700">{error}</p>}
        {msg && <p className="mt-4 text-sm text-emerald-800">{msg}</p>}

        <div className="mt-8 space-y-4">
          {quests.map((q) => (
            <article
              key={q.id}
              className="rounded-2xl border border-[#3E2C1C]/10 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-xl font-bold">
                    {q.title.replace(/^Tribe:\s*/i, "")}
                  </h2>
                  <p className="mt-1 text-sm text-[#6D5D56]">{q.description}</p>
                  <p className="mt-2 text-sm font-semibold text-[#D4AF37]">+{q.xp_reward} XP</p>
                </div>
                <StatusPill status={q.status} />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {q.link && (
                  <Button
                    asChild
                    variant="outline"
                    className="border-[#3E2C1C]/20 text-[#3E2C1C]"
                  >
                    <a href={q.link} target="_blank" rel="noopener noreferrer">
                      Open page <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
                {q.status === "available" && (
                  <Button
                    onClick={() => submit(q.id)}
                    disabled={busyId === q.id}
                    className="bg-[#3E2C1C] text-[#F5F5F0] hover:bg-[#3E2C1C]/90"
                  >
                    {busyId === q.id ? "Submitting…" : "I've done this"}
                  </Button>
                )}
                {q.status === "pending" && (
                  <span className="inline-flex items-center gap-1 text-sm text-[#8D5B3E]">
                    <Clock className="h-4 w-4" /> Awaiting admin review
                  </span>
                )}
                {q.status === "approved" && (
                  <span className="inline-flex items-center gap-1 text-sm text-emerald-800">
                    <CheckCircle2 className="h-4 w-4" /> Completed
                  </span>
                )}
              </div>
            </article>
          ))}
          {!error && quests.length === 0 && (
            <p className="text-[#6D5D56]">
              No starter quests yet. Run migration{" "}
              <code className="rounded bg-white px-1">045_tribe_starter_social_quests.sql</code>{" "}
              on Buddy Supabase.
            </p>
          )}
        </div>

        <p className="mt-8 text-center text-sm text-[#6D5D56]">
          <Link href="/profile" className="underline">
            Back to profile
          </Link>
        </p>
      </section>
      <Footer />
    </main>
  )
}

function StatusPill({ status }: { status: Quest["status"] }) {
  if (status === "approved") {
    return (
      <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800">
        Done
      </span>
    )
  }
  if (status === "pending") {
    return (
      <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-900">
        Pending
      </span>
    )
  }
  return (
    <span className="rounded-full bg-[#3E2C1C]/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#3E2C1C]">
      Available
    </span>
  )
}
