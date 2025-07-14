"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase" // Import Supabase client

interface User {
  id: string // Supabase user ID
  username: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, username: string) => Promise<{ success: boolean; error: string | null }>
  logout: () => Promise<void>
  register: (email: string, password: string, username: string) => Promise<{ success: boolean; error: string | null }>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const fetchUser = useCallback(async () => {
    setLoading(true)
    const {
      data: { user: supabaseUser },
      error,
    } = await supabase.auth.getUser()
    if (supabaseUser) {
      // In a real app, you might fetch the username from a separate 'profiles' table
      // For now, we'll use the email as a fallback or assume username is part of metadata
      setUser({
        id: supabaseUser.id,
        username: supabaseUser.user_metadata?.username || supabaseUser.email?.split("@")[0] || "User",
        email: supabaseUser.email || "",
      })
    } else {
      setUser(null)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          username: session.user.user_metadata?.username || session.user.email?.split("@")[0] || "User",
          email: session.user.email || "",
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => {
      authListener.unsubscribe()
    }
  }, [fetchUser])

  const login = useCallback(
    async (email: string, password: string, username: string) => {
      setLoading(true)
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      setLoading(false)
      if (error) {
        return { success: false, error: error.message }
      }
      if (data.user) {
        // Update user metadata if username is provided and not already set
        if (username && !data.user.user_metadata?.username) {
          await supabase.auth.updateUser({ data: { username } })
        }
        setUser({
          id: data.user.id,
          username: data.user.user_metadata?.username || username || data.user.email?.split("@")[0] || "User",
          email: data.user.email || "",
        })
        router.push("/")
        return { success: true, error: null }
      }
      return { success: false, error: "Login failed" }
    },
    [router],
  )

  const logout = useCallback(async () => {
    setLoading(true)
    const { error } = await supabase.auth.signOut()
    setLoading(false)
    if (!error) {
      setUser(null)
      router.push("/login")
    } else {
      console.error("Logout error:", error.message)
    }
  }, [router])

  const register = useCallback(
    async (email: string, password: string, username: string) => {
      setLoading(true)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username }, // Store username in user_metadata
        },
      })
      setLoading(false)
      if (error) {
        return { success: false, error: error.message }
      }
      if (data.user) {
        setUser({
          id: data.user.id,
          username: data.user.user_metadata?.username || username || data.user.email?.split("@")[0] || "User",
          email: data.user.email || "",
        })
        router.push("/")
        return { success: true, error: null }
      }
      return { success: false, error: "Registration failed" }
    },
    [router],
  )

  return <AuthContext.Provider value={{ user, login, logout, register, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
