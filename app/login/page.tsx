"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const supabase = createClient()
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })
      if (authError) {
        setError(authError.message)
        return
      }
      await fetch("/api/auth/assign-label", { method: "POST" }).catch(() => null)
      router.push("/profile")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setLoading(false)
    }
  }

  async function googleSignIn() {
    setError(null)
    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (authError) setError(authError.message)
  }

  return (
    <main className="min-h-screen bg-[#F5F5F0]">
      <Navigation />
      <section className="container mx-auto max-w-md px-4 py-16">
        <h1 className="font-display text-3xl font-bold text-[#3E2C1C]">Welcome back</h1>
        <p className="mt-2 text-sm text-[#6D5D56]">
          Use your Buddy / Daring Tribe account. One login for both apps.
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label className="text-sm font-medium text-[#3E2C1C]">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#3E2C1C]/15 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#D4AF37]"
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
              className="mt-1 w-full rounded-xl border border-[#3E2C1C]/15 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
          </div>
          {error && <p className="text-sm text-red-700">{error}</p>}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#3E2C1C] text-[#F5F5F0] hover:bg-[#3E2C1C]/90 py-6"
          >
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </form>
        <Button
          type="button"
          variant="outline"
          onClick={googleSignIn}
          className="mt-3 w-full py-6 border-[#3E2C1C]/20"
        >
          Continue with Google
        </Button>
        <p className="mt-6 text-center text-sm text-[#6D5D56]">
          New here?{" "}
          <Link href="/signup" className="font-semibold text-[#D4AF37] hover:underline">
            Create an account
          </Link>
        </p>
      </section>
      <Footer />
    </main>
  )
}
