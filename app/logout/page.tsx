"use client"

import { useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

export default function LogoutPage() {
  useEffect(() => {
    const run = async () => {
      try {
        const supabase = createClient()
        await supabase.auth.signOut()
      } catch {
        // ignore
      }
      window.location.href = "/"
    }
    run()
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F5F5F0]">
      <p className="text-[#3E2C1C]">Signing out…</p>
    </main>
  )
}
