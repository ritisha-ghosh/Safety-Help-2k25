"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login, loading } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!email || !password) {
      setError("Please enter both email and password.")
      return
    }

    const result = await login(email, password, email.split("@")[0]) // Pass email as username for simplicity
    if (!result.success) {
      setError(result.error || "Login failed. Please check your credentials.")
    } else {
      router.push("/")
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <Card className="w-full max-w-md bg-dark-card border-dark-border shadow-glow-md shadow-electric-blue/30">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-electric-blue">Login</CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your credentials to access your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background border-dark-border focus:ring-electric-blue"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-background border-dark-border focus:ring-electric-blue"
              />
            </div>
            {error && <p className="text-destructive text-sm text-center">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-electric-blue text-primary-foreground hover:bg-electric-blue/80 shadow-glow-sm shadow-electric-blue/50"
              disabled={loading}
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground justify-center">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-electric-blue hover:underline ml-1" prefetch={false}>
            Register
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
