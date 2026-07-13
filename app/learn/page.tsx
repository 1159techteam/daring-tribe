"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { BookOpen, ArrowRight } from "lucide-react"

type Lesson = {
  id: string
  slug: string
  title: string
  xp_reward: number
  is_published: boolean
  sort_order: number
}

type Module = {
  id: string
  title: string
  sort_order: number
  learn_lessons: Lesson[]
}

type Course = {
  id: string
  slug: string
  title: string
  description: string | null
  difficulty: string
  xp_bonus: number
  learn_modules: Module[]
}

export default function LearnCatalogPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/learn/courses")
      .then(async (res) => {
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || "Failed to load")
        setCourses(data.courses || [])
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="min-h-screen bg-[#F5F5F0]">
      <Navigation />
      <section className="bg-[#3E2C1C] py-16 text-[#F5F5F0]">
        <div className="container mx-auto px-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            School for the Daring
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">Learn. Earn. Win.</h1>
          <p className="mt-4 max-w-2xl text-stone-300">
            Complete lessons to earn XP that shows up in your Buddy wallet. Climb levels and cadre ranks as you grow.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        {loading && <p className="text-[#6D5D56]">Loading courses…</p>}
        {error && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
            <p className="font-semibold">Could not load courses</p>
            <p className="mt-1 text-sm">
              {error}. Apply migration <code className="rounded bg-white px-1">042_learn_platform.sql</code> on
              Buddy Supabase, then refresh.
            </p>
          </div>
        )}
        <div className="grid gap-6 md:grid-cols-2">
          {courses.map((course) => {
            const lessonCount = (course.learn_modules || []).reduce(
              (n, m) => n + (m.learn_lessons?.filter((l) => l.is_published !== false).length || 0),
              0
            )
            return (
              <article
                key={course.id}
                className="flex flex-col rounded-2xl border border-[#3E2C1C]/10 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4AF37]/15 text-[#3E2C1C]">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-[#3E2C1C]/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#3E2C1C]">
                    {course.difficulty}
                  </span>
                </div>
                <h2 className="mt-4 font-display text-2xl font-bold text-[#3E2C1C]">{course.title}</h2>
                <p className="mt-2 flex-1 text-sm text-[#6D5D56]">{course.description}</p>
                <p className="mt-4 text-xs text-[#6D5D56]">
                  {lessonCount} lesson{lessonCount === 1 ? "" : "s"} · +{course.xp_bonus} XP course bonus
                </p>
                <Button asChild className="mt-6 bg-[#3E2C1C] text-[#F5F5F0] hover:bg-[#3E2C1C]/90">
                  <Link href={`/learn/${course.slug}`}>
                    Open course <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </article>
            )
          })}
        </div>
      </section>
      <Footer />
    </main>
  )
}
