/** Lesson video URL helpers — Spaces, YouTube, external */

export type VideoKind = "spaces" | "youtube" | "external" | null

export function videoKind(videoUrl: string | null | undefined): VideoKind {
  if (!videoUrl?.trim()) return null
  const url = videoUrl.trim()
  if (isSpacesVideo(url)) return "spaces"
  if (isYoutubeUrl(url)) return "youtube"
  return "external"
}

export function isSpacesVideo(videoUrl: string): boolean {
  const trimmed = videoUrl.trim()
  if (!trimmed.includes("://")) return true
  return trimmed.includes("digitaloceanspaces.com")
}

export function isYoutubeUrl(videoUrl: string): boolean {
  return /youtube\.com|youtu\.be/i.test(videoUrl)
}

export function youtubeEmbedUrl(videoUrl: string): string | null {
  if (videoUrl.includes("youtube.com/embed/")) return videoUrl
  const yt = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/)
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`
  return null
}

/** Object key inside the Spaces bucket (path only, no leading slash). */
export function spacesObjectKey(videoUrl: string): string {
  const trimmed = videoUrl.trim()
  if (!trimmed.includes("://")) {
    return trimmed.replace(/^\/+/, "")
  }
  try {
    const u = new URL(trimmed)
    if (u.hostname.includes("digitaloceanspaces.com")) {
      return u.pathname.replace(/^\/+/, "")
    }
  } catch {
    // fall through
  }
  return trimmed.replace(/^\/+/, "")
}
