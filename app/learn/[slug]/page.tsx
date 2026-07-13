"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/providers/auth-provider"
import { CheckCircle2, ExternalLink, Play } from "lucide-react"

type Lesson = {
  id: string
  slug: string
  title: string
  description: string | null
  video_url: string | null
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
  xp_bonus: number
  learn_modules: Module[]
}

function embedUrl(url: string | null): string | null {
  if (!url) return null
  if (url.includes("youtube.com/embed/")) return url
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/)
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`
  if (url.includes("classroom.google.com")) return null
  return url
}

export default function CourseDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [course, setCourse] = useState<Course | null>(null)
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null)
  const [completed, setCompleted] = useState<Set<string>>(new Set())
  const [msg, setMsg] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/learn/courses")
      .then(async (res) => {
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || "Failed")
        const found = (data.courses || []).find((c: Course) => c.slug === slug)
        if (!found) throw new Error("Course not found")
        setCourse(found)
        const first = found.learn_modules
          ?.flatMap((m: Module) => m.learn_lessons || [])
          ?.sort((a: Lesson, b: Lesson) => a.sort_order - b.sort_order)?.[0]
        if (first) setActiveLessonId(first.id)
      })
      .catch((e) => setError(e.message))
  }, [slug])

  const lessons = useMemo(() => {
    if (!course) return [] as Lesson[]
    return (course.learn_modules || [])
      .sort((a, b) => a.sort_order - b.sort_order)
      .flatMap((m) =>
        (m.learn_lessons || [])
          .filter((l) => l.is_published !== false)
          .sort((a, b) => a.sort_order - b.sort_order)
      )
  }, [course])

  const active = lessons.find((l) => l.id === activeLessonId) || lessons[0]
  const embed = embedUrl(active?.video_url || null)

  async function completeLesson() {
    if (!user) {
      router.push("/login")
      return
    }
    if (!active) return
    setBusy(true)
    setMsg(null)
    try {
      const res = await fetch("/api/learn/lessons/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lesson_id: active.id }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed")
      setCompleted((prev) => new Set(prev).add(active.id))
      if (data.already_completed) {
        setMsg("Already completed — no extra XP")
      } else {
        let text = `+${data.xp_awarded} XP`
        if (data.course_completed) text += ` · Course complete +${data.course_xp_awarded} XP!`
        setMsg(text)
      }
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Error")
    } finally {
      setBusy(false)
    }
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

  if (!course || !active) {
    return (
      <main className="min-h-screen bg-[#F5F5F0]">
        <Navigation />
        <p className="p-16 text-center text-[#6D5D56]">Loading course…</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#F5F5F0]">
      <Navigation />
      <div className="container mx-auto grid gap-8 px-4 py-10 lg:grid-cols-[1fr_320px]">
        <div>
          <Link href="/learn" className="text-sm text-[#6D5D56] hover:text-[#3E2C1C]">
            ← All courses
          </Link>
          <h1 className="mt-3 font-display text-3xl font-bold text-[#3E2C1C]">{course.title}</h1>
          <p className="mt-2 text-[#6D5D56]">{course.description}</p>

          <div className="mt-6 overflow-hidden rounded-2xl border border-[#3E2C1C]/10 bg-black">
            {embed ? (
              <iframe
                title={active.title}
                src={embed}
                className="aspect-video w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="flex aspect-video flex-col items-center justify-center gap-4 bg-[#3E2C1C] p-6 text-center text-[#F5F5F0]">
                <Play className="h-10 w-10 text-[#D4AF37]" />
                <p className="max-w-md text-sm text-stone-300">
                  {active.video_url
                    ? "This lesson opens in Google Classroom / external link."
                    : "Add a YouTube (or embed) URL for this lesson in the database."}
                </p>
                {active.video_url && (
                  <Button asChild className="bg-[#D4AF37] text-[#3E2C1C] font-bold">
                    <a href={active.video_url} target="_blank" rel="noopener noreferrer">
                      Open lesson <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>

          <div className="mt-6 rounded-2xl border border-[#3E2C1C]/10 bg-white p-6">
            <h2 className="font-display text-xl font-bold text-[#3E2C1C]">{active.title}</h2>
            <p className="mt-2 text-sm text-[#6D5D56]">{active.description}</p>
            <p className="mt-3 text-sm font-semibold text-[#D4AF37]">+{active.xp_reward} XP on complete</p>
            <Button
              onClick={completeLesson}
              disabled={busy || authLoading}
              className="mt-4 bg-[#3E2C1C] text-[#F5F5F0] hover:bg-[#3E2C1C]/90"
            >
              {completed.has(active.id) ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" /> Completed
                </>
              ) : busy ? (
                "Saving…"
              ) : user ? (
                "Mark complete & earn XP"
              ) : (
                "Sign in to earn XP"
              )}
            </Button>
            {msg && <p className="mt-3 text-sm text-[#3E2C1C]">{msg}</p>}
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-[#3E2C1C]/10 bg-white p-4">
          <h3 className="px-2 text-xs font-bold uppercase tracking-wider text-[#6D5D56]">Lessons</h3>
          <ul className="mt-2 space-y-1">
            {lessons.map((lesson, i) => (
              <li key={lesson.id}>
                <button
                  type="button"
                  onClick={() => setActiveLessonId(lesson.id)}
                  className={`flex w-full items-center gap-2 rounded-xl px-3 py-3 text-left text-sm transition ${
                    active.id === lesson.id
                      ? "bg-[#3E2C1C] text-[#F5F5F0]"
                      : "hover:bg-[#F5F5F0] text-[#3E2C1C]"
                  }`}
                >
                  <span className="text-xs opacity-60">{i + 1}</span>
                  <span className="flex-1 font-medium">{lesson.title}</span>
                  {completed.has(lesson.id) && <CheckCircle2 className="h-4 w-4 text-[#D4AF37]" />}
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-4 px-2 text-xs text-[#6D5D56]">Course bonus: +{course.xp_bonus} XP</p>
        </aside>
      </div>
      <Footer />
    </main>
  )
}
