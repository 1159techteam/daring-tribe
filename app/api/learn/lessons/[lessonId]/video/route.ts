import { NextResponse } from "next/server"
import { createServiceRoleClient } from "@/lib/supabase/server"
import { requireLearnMember } from "@/lib/learn/require-member"
import { createSignedVideoUrl } from "@/lib/learn/spaces"
import { isSpacesVideo, isYoutubeUrl, videoKind, youtubeEmbedUrl } from "@/lib/learn/video"

type RouteContext = { params: Promise<{ lessonId: string }> }

/** GET /api/learn/lessons/[lessonId]/video — signed Spaces URL or embed info (members only) */
export async function GET(_request: Request, context: RouteContext) {
  try {
    const auth = await requireLearnMember()
    if (auth.error) return auth.error

    const { lessonId } = await context.params
    if (!lessonId) {
      return NextResponse.json({ error: "lessonId required" }, { status: 422 })
    }

    const admin = createServiceRoleClient()
    const { data: lesson, error: lessonErr } = await admin
      .from("learn_lessons")
      .select("id, video_url, is_published, module_id")
      .eq("id", lessonId)
      .maybeSingle()

    if (lessonErr || !lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 })
    }

    if (lesson.is_published === false) {
      return NextResponse.json({ error: "Lesson not available" }, { status: 404 })
    }

    const { data: mod } = await admin
      .from("learn_modules")
      .select("learn_courses(is_published)")
      .eq("id", lesson.module_id)
      .maybeSingle()

    const coursePublished = (
      mod as { learn_courses?: { is_published?: boolean } | null } | null
    )?.learn_courses?.is_published

    if (coursePublished === false) {
      return NextResponse.json({ error: "Lesson not available" }, { status: 404 })
    }

    const videoUrl = lesson.video_url as string | null
    if (!videoUrl?.trim()) {
      return NextResponse.json({ error: "No video for this lesson" }, { status: 404 })
    }

    const kind = videoKind(videoUrl)

    if (kind === "spaces" || isSpacesVideo(videoUrl)) {
      const { url, expiresAt } = await createSignedVideoUrl(videoUrl)
      return NextResponse.json({
        type: "html5",
        url,
        expiresAt,
      })
    }

    if (kind === "youtube" || isYoutubeUrl(videoUrl)) {
      const embedUrl = youtubeEmbedUrl(videoUrl)
      if (!embedUrl) {
        return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 422 })
      }
      return NextResponse.json({
        type: "youtube",
        embedUrl,
      })
    }

    return NextResponse.json({
      type: "external",
      url: videoUrl,
    })
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to load video"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
