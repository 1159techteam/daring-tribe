import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { spacesObjectKey } from "@/lib/learn/video"

const DEFAULT_EXPIRES_SECONDS = 4 * 60 * 60 // 4 hours

function getSpacesConfig() {
  const key = process.env.DO_SPACES_KEY
  const secret = process.env.DO_SPACES_SECRET
  const bucket = process.env.DO_SPACES_BUCKET
  const region = process.env.DO_SPACES_REGION || "lon1"
  const endpoint =
    process.env.DO_SPACES_ENDPOINT || `https://${region}.digitaloceanspaces.com`

  if (!key || !secret || !bucket) {
    throw new Error(
      "Missing DO_SPACES_KEY, DO_SPACES_SECRET, or DO_SPACES_BUCKET environment variables"
    )
  }

  return { key, secret, bucket, region, endpoint }
}

let client: S3Client | null = null

function getS3Client() {
  if (client) return client
  const { key, secret, region, endpoint } = getSpacesConfig()
  client = new S3Client({
    endpoint,
    region,
    credentials: { accessKeyId: key, secretAccessKey: secret },
    forcePathStyle: false,
  })
  return client
}

/** Presigned GET URL for a private Spaces object (member-only playback). */
export async function createSignedVideoUrl(
  videoUrl: string,
  expiresInSeconds = DEFAULT_EXPIRES_SECONDS
) {
  const { bucket } = getSpacesConfig()
  const objectKey = spacesObjectKey(videoUrl)

  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: objectKey,
  })

  const url = await getSignedUrl(getS3Client(), command, {
    expiresIn: expiresInSeconds,
  })

  const expiresAt = new Date(Date.now() + expiresInSeconds * 1000).toISOString()
  return { url, expiresAt }
}
