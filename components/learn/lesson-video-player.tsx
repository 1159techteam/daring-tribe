"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink, Play } from "lucide-react"

type VideoPayload =
  | { type: "html5"; url: string; expiresAt: string }
  | { type: "youtube"; embedUrl: string }
  | { type: "external"; url: string }

type Props = {
  lessonId: string
  lessonTitle: string
  hasVideo: boolean
  signedIn: boolean
}

export function LessonVideoPlayer({ lessonId, lessonTitle, hasVideo, signedIn }: Props) {
  const [payload, setPayload] = useState<VideoPayload | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!hasVideo || !signedIn || !lessonId) {
      setPayload(null)
      setError(null)
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)
    setPayload(null)

    fetch(`/api/learn/lessons/${lessonId}/video`)
      .then(async (res) => {
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || "Failed to load video")
        if (!cancelled) setPayload(data as VideoPayload)
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load video")
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [lessonId, hasVideo, signedIn])

  if (!hasVideo) {
    return (
      <div className="flex aspect-video flex-col items-center justify-center gap-4 bg-[#3E2C1C] p-6 text-center text-[#F5F5F0]">
        <Play className="h-10 w-10 text-[#D4AF37]" />
        <p className="max-w-md text-sm text-stone-300">Video coming soon for this lesson.</p>
      </div>
    )
  }

  if (!signedIn) {
    return (
      <div className="flex aspect-video flex-col items-center justify-center gap-4 bg-[#3E2C1C] p-6 text-center text-[#F5F5F0]">
        <Play className="h-10 w-10 text-[#D4AF37]" />
        <p className="max-w-md text-sm text-stone-300">Sign in to watch this lesson.</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex aspect-video items-center justify-center bg-[#3E2C1C] text-sm text-stone-300">
        Loading video…
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex aspect-video flex-col items-center justify-center gap-3 bg-[#3E2C1C] p-6 text-center text-[#F5F5F0]">
        <p className="text-sm text-red-200">{error}</p>
        <Button
          type="button"
          variant="outline"
          className="border-[#D4AF37]/40 text-[#F5F5F0]"
          onClick={() => {
            setLoading(true)
            setError(null)
            fetch(`/api/learn/lessons/${lessonId}/video`)
              .then(async (res) => {
                const data = await res.json()
                if (!res.ok) throw new Error(data.error || "Failed to load video")
                setPayload(data as VideoPayload)
              })
              .catch((e) => setError(e instanceof Error ? e.message : "Failed to load video"))
              .finally(() => setLoading(false))
          }}
        >
          Retry
        </Button>
      </div>
    )
  }

  if (payload?.type === "html5") {
    return (
      <video
        key={payload.url}
        src={payload.url}
        controls
        playsInline
        preload="metadata"
        className="aspect-video w-full bg-black"
        title={lessonTitle}
      >
        Your browser does not support embedded video.
      </video>
    )
  }

  if (payload?.type === "youtube") {
    return (
      <iframe
        title={lessonTitle}
        src={payload.embedUrl}
        className="aspect-video w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }

  if (payload?.type === "external") {
    return (
      <div className="flex aspect-video flex-col items-center justify-center gap-4 bg-[#3E2C1C] p-6 text-center text-[#F5F5F0]">
        <Play className="h-10 w-10 text-[#D4AF37]" />
        <p className="max-w-md text-sm text-stone-300">This lesson opens in an external app.</p>
        <Button asChild className="bg-[#D4AF37] font-bold text-[#3E2C1C]">
          <a href={payload.url} target="_blank" rel="noopener noreferrer">
            Open lesson <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex aspect-video items-center justify-center bg-[#3E2C1C] text-sm text-stone-300">
      Preparing player…
    </div>
  )
}
