"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/providers/auth-provider"
import { GraduationCap, ScrollText } from "lucide-react"

type Certificate = {
  id: string
  title: string
  certificate_code: string
  issued_at: string
  course_id: string
  learn_courses?: { slug: string; title: string; difficulty?: string } | null
}

export default function CertificatesPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [certs, setCerts] = useState<Certificate[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoading) return
    if (!user) {
      router.push("/login")
      return
    }
    fetch("/api/learn/certificates")
      .then(async (res) => {
        const data = await res.json()
        if (!res.ok && !data.certificates) throw new Error(data.error || "Failed")
        setCerts(data.certificates || [])
        if (data.error && !(data.certificates || []).length) {
          setError(
            "Certificates aren’t available yet — apply migration 046_learn_certificates.sql on Buddy Supabase."
          )
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [user, authLoading, router])

  if (authLoading || loading) {
    return (
      <main className="min-h-screen bg-[#F5F5F0]">
        <Navigation />
        <p className="p-16 text-center text-[#6D5D56]">Loading certificates…</p>
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
            <h1 className="font-display text-4xl font-bold">Certificates</h1>
            <p className="mt-2 max-w-xl text-[#6D5D56]">
              Finish an entire course to earn a Daring Tribe certificate. More full courses are
              coming — this shelf is ready for them.
            </p>
          </div>
          <Link href="/badges" className="text-sm font-semibold text-[#8D5B3E] underline">
            View badges →
          </Link>
        </div>

        {error && (
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            {error}
          </div>
        )}

        {certs.length === 0 && !error ? (
          <div className="mt-12 rounded-2xl border border-[#3E2C1C]/10 bg-white p-10 text-center shadow-sm">
            <ScrollText className="mx-auto h-12 w-12 text-[#D4AF37]/70" />
            <p className="mt-4 text-[#6D5D56]">
              No certificates yet. Complete every lesson in a course to earn one.
            </p>
            <Button asChild className="mt-6 bg-[#3E2C1C] text-[#F5F5F0] hover:bg-[#3E2C1C]/90">
              <Link href="/learn">Browse courses</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {certs.map((c) => (
              <article
                key={c.id}
                className="relative overflow-hidden rounded-2xl border border-[#D4AF37]/30 bg-white p-6 shadow-sm"
              >
                <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-[#D4AF37] to-[#8D5B3E]" />
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#3E2C1C] text-[#D4AF37]">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8D5B3E]">
                      Certificate of completion
                    </p>
                    <h2 className="mt-1 font-display text-xl font-bold">{c.title}</h2>
                    <p className="mt-2 font-mono text-xs text-[#6D5D56]">{c.certificate_code}</p>
                    <p className="mt-3 text-sm text-[#6D5D56]">
                      Issued{" "}
                      {new Date(c.issued_at).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    {c.learn_courses?.slug && (
                      <Link
                        href={`/learn/${c.learn_courses.slug}`}
                        className="mt-4 inline-block text-sm font-semibold text-[#8D5B3E] underline"
                      >
                        View course
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </main>
  )
}
