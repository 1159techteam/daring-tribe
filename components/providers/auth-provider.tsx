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
import type { User } from "@supabase/supabase-js"

type AuthContextValue = {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

type SessionUser = {
  id: string
  email?: string
  user_metadata?: User["user_metadata"]
}

function toUser(sessionUser: SessionUser): User {
  return {
    id: sessionUser.id,
    email: sessionUser.email,
    user_metadata: sessionUser.user_metadata ?? {},
    app_metadata: {},
    aud: "authenticated",
    created_at: "",
  } as User
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/session", { credentials: "include" })
      if (!res.ok) {
        setUser(null)
        return
      }
      const data = await res.json()
      setUser(data.user ? toUser(data.user) : null)
    } catch {
      setUser(null)
    }
  }, [])

  useEffect(() => {
    let mounted = true
    refresh().finally(() => {
      if (mounted) setLoading(false)
    })
    return () => {
      mounted = false
    }
  }, [refresh])

  const signOut = useCallback(async () => {
    try {
      await fetch("/api/auth/signout", { method: "POST", credentials: "include" })
    } catch {
      // ignore
    }
    setUser(null)
    window.location.href = "/"
  }, [])

  const value = useMemo(
    () => ({ user, loading, signOut, refresh }),
    [user, loading, signOut, refresh]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
