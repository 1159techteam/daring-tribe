"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import type { User, SupabaseClient } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"

type AuthContextValue = {
  user: User | null
  loading: boolean
  supabase: SupabaseClient | null
  signOut: () => Promise<void>
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      setSupabase(createClient())
    } catch {
      setLoading(false)
    }
  }, [])

  const refresh = useCallback(async () => {
    if (!supabase) return
    const { data } = await supabase.auth.getUser()
    setUser(data.user ?? null)
  }, [supabase])

  useEffect(() => {
    if (!supabase) return
    let mounted = true
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return
      setUser(data.session?.user ?? null)
      setLoading(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "TOKEN_REFRESHED") {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    })
    return () => {
      mounted = false
      sub.subscription.unsubscribe()
    }
  }, [supabase])

  const signOut = useCallback(async () => {
    if (supabase) await supabase.auth.signOut()
    setUser(null)
    window.location.href = "/"
  }, [supabase])

  const value = useMemo(
    () => ({ user, loading, supabase, signOut, refresh }),
    [user, loading, supabase, signOut, refresh]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
