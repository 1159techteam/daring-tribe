"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [info, setInfo] = useState<string | null>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setInfo(null)
    try {
      const supabase = createClient()
      const { data, error: authError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { name: name.trim() },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (authError) {
        setError(authError.message)
        return
      }
      if (data.session) {
        await fetch("/api/auth/assign-label", { method: "POST" }).catch(() => null)
        router.push("/learn")
        router.refresh()
        return
      }
      setInfo("Check your email to confirm your account, then sign in.")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F5F5F0]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `repeating-radial-gradient(circle at 20% 30%, #8D5B3E 0, #8D5B3E 80px, transparent 81px, transparent 82px)`,
          backgroundSize: "220px 220px",
        }}
      />
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#D4AF37]/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-32 h-80 w-80 rounded-full bg-[#8D5B3E]/20 blur-3xl" />

      <Navigation />
      <section className="relative z-10 container mx-auto flex justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-3xl border border-white/50 bg-white/40 p-8 shadow-[0_20px_60px_rgba(62,44,28,0.12)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/30">
          <h1 className="font-display text-3xl font-bold text-[#3E2C1C]">Join the Tribe</h1>
          <p className="mt-2 text-sm text-[#6D5D56]">
            Open to anyone. This account also works on the Buddy App, no second signup needed.
          </p>
          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div>
              <label className="text-sm font-medium text-[#3E2C1C]">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/60 bg-white/55 px-4 py-3 text-sm text-[#3E2C1C] outline-none backdrop-blur-sm focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#3E2C1C]">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/60 bg-white/55 px-4 py-3 text-sm text-[#3E2C1C] outline-none backdrop-blur-sm focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#3E2C1C]">Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/60 bg-white/55 px-4 py-3 text-sm text-[#3E2C1C] outline-none backdrop-blur-sm focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>
            {error && <p className="text-sm text-red-700">{error}</p>}
            {info && <p className="text-sm text-emerald-800">{info}</p>}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D4AF37] text-[#3E2C1C] hover:bg-[#D4AF37]/90 py-6 font-bold"
            >
              {loading ? "Creating…" : "Create account"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-[#6D5D56]">
            Already have a Buddy App account?{" "}
            <Link href="/login" className="font-semibold text-[#3E2C1C] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </section>
      <Footer />
    </main>
  )
}
