"use client"

import { FormEvent, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/providers/auth-provider"
import type { SocialHandles } from "@/lib/social-handles"

export default function EditProfilePage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [social, setSocial] = useState<SocialHandles>({
    instagram: "",
    tiktok: "",
    whatsapp: "",
    facebook: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (authLoading) return
    if (!user) {
      router.push("/login")
      return
    }
    fetch("/api/profile")
      .then(async (res) => {
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || "Failed to load")
        setName(data.user?.name || "")
        setEmail(data.user?.email || "")
        setSocial({
          instagram: data.user?.social_handles?.instagram || "",
          tiktok: data.user?.social_handles?.tiktok || "",
          whatsapp: data.user?.social_handles?.whatsapp || "",
          facebook: data.user?.social_handles?.facebook || "",
        })
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [user, authLoading, router])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSaved(false)
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          social_handles: social,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Save failed")
      setSaved(true)
      setName(data.profile?.name || name)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed")
    } finally {
      setSaving(false)
    }
  }

  if (authLoading || loading) {
    return (
      <main className="min-h-screen bg-[#F5F5F0]">
        <Navigation />
        <p className="p-16 text-center text-[#6D5D56]">Loading…</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#F5F5F0] text-[#3E2C1C]">
      <Navigation />
      <section className="mx-auto max-w-2xl px-4 py-10">
        <Link href="/profile" className="text-sm text-[#6D5D56] hover:text-[#3E2C1C]">
          ← Back to profile
        </Link>
        <h1 className="mt-4 font-display text-3xl font-bold">Edit Profile</h1>
        <p className="mt-2 text-sm text-[#6D5D56]">
          Update your name and social links. Changes sync with the Buddy App.
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-8 space-y-6 rounded-2xl border border-[#3E2C1C]/10 bg-white p-6 shadow-sm md:p-8"
        >
          <div>
            <label className="text-sm font-medium">Display name</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#3E2C1C]/15 bg-[#F5F5F0] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              value={email}
              disabled
              className="mt-1 w-full rounded-xl border border-[#3E2C1C]/10 bg-[#F5F5F0]/60 px-4 py-3 text-sm text-[#6D5D56]"
            />
            <p className="mt-1 text-xs text-[#6D5D56]">Email cannot be changed here</p>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold">Social Links</h2>
            <p className="mt-1 text-sm text-[#6D5D56]">
              Add your handles so we can verify starter social quests.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {(
                [
                  ["instagram", "Instagram"],
                  ["tiktok", "TikTok"],
                  ["whatsapp", "WhatsApp"],
                  ["facebook", "Facebook"],
                ] as const
              ).map(([key, label]) => (
                <div key={key}>
                  <label className="text-sm font-medium">{label}</label>
                  <input
                    value={social[key] || ""}
                    onChange={(e) => setSocial({ ...social, [key]: e.target.value })}
                    placeholder={key === "instagram" ? "@yourhandle" : "Not set"}
                    className="mt-1 w-full rounded-xl border border-[#3E2C1C]/15 bg-[#F5F5F0] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
              ))}
            </div>
          </div>

          {error && <p className="text-sm text-red-700">{error}</p>}
          {saved && <p className="text-sm text-emerald-800">Profile saved.</p>}

          <div className="flex flex-wrap gap-3">
            <Button
              type="submit"
              disabled={saving}
              className="bg-[#D4AF37] font-bold text-[#3E2C1C] hover:bg-[#D4AF37]/90"
            >
              {saving ? "Saving…" : "Save changes"}
            </Button>
            <Button asChild type="button" variant="outline" className="border-[#3E2C1C]/20">
              <Link href="/profile">Cancel</Link>
            </Button>
          </div>
        </form>
      </section>
      <Footer />
    </main>
  )
}
