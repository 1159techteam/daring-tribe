"use client"

import { useEffect } from "react"

export default function LogoutPage() {
  useEffect(() => {
    const run = async () => {
      try {
        await fetch("/api/auth/signout", { method: "POST", credentials: "include" })
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
