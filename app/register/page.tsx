"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/context/auth-context" // Corrected import path
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input" // Corrected import path
import { Label } from "@/components/ui/label" // Corrected import path
import { Button } from "@/components/ui/button" // Corrected import path
import Link from "next/link"
import { Loader2 } from "lucide-react"

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { register, loading } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!username || !email || !password) {
      setError("Please fill in all fields.")
      return
    }

    const result = await register(email, password, username)
    if (!result.success) {
      setError(result.error || "Registration failed. Please try again.")
    } else {
      router.push("/")
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <Card className="w-full max-w-md bg-dark-card border-dark-border shadow-glow-md shadow-vibrant-green/30">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-electric-blue">Register</CardTitle>
          <CardDescription className="text-muted-foreground">
            Create your account to join the SafetyHelp community.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="john.doe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-background border-dark-border focus:ring-vibrant-green"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background border-dark-border focus:ring-vibrant-green"
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
                className="bg-background border-dark-border focus:ring-vibrant-green"
              />
            </div>
            {error && <p className="text-destructive text-sm text-center">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-vibrant-green text-primary-foreground hover:bg-vibrant-green/80 shadow-glow-sm shadow-vibrant-green/50"
              disabled={loading}
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Register
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground justify-center">
          Already have an account?{" "}
          <Link href="/login" className="text-vibrant-green hover:underline ml-1" prefetch={false}>
            Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default RegisterPage
