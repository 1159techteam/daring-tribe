import { createServerClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"
import { assignDaringTribeLabel } from "@/lib/labels"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (code) {
    const supabase = await createServerClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) {
      return NextResponse.redirect(`${requestUrl.origin}/login?error=auth_callback_error`)
    }
    const userId = data.session?.user?.id
    if (userId) {
      try {
        await assignDaringTribeLabel(userId)
      } catch {
        // Label may already exist or DB not migrated yet
      }
    }
  }

  return NextResponse.redirect(`${requestUrl.origin}/learn`)
}
