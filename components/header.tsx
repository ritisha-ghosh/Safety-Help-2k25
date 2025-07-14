"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import { LogOut, UserCircle, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

export function Header() {
  const { user, logout } = useAuth()
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const navLinks = (
    <>
      <Link href="/" className="text-foreground hover:text-electric-blue transition-colors" prefetch={false}>
        Dashboard
      </Link>
      <Link href="/community" className="text-foreground hover:text-electric-blue transition-colors" prefetch={false}>
        Community
      </Link>
      <Link href="/map" className="text-foreground hover:text-electric-blue transition-colors" prefetch={false}>
        Safety Map
      </Link>
      <Link href="/sos" className="text-foreground hover:text-electric-blue transition-colors" prefetch={false}>
        Emergency SOS
      </Link>
      <Link href="/quiz" className="text-foreground hover:text-electric-blue transition-colors" prefetch={false}>
        Safety Quiz
      </Link>
      <Link
        href="/emergency-services"
        className="text-foreground hover:text-electric-blue transition-colors"
        prefetch={false}
      >
        Services
      </Link>
    </>
  )

  return (
    <header className="sticky top-0 z-40 w-full border-b border-dark-border frosted-glass">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-electric-blue" prefetch={false}>
          <span>SafetyHelp</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">{navLinks}</nav>

        {/* Mobile Navigation */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Toggle navigation">
              <Menu className="h-6 w-6 text-foreground" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px] sm:w-[300px] bg-dark-card border-dark-border p-4">
            <div className="flex flex-col gap-4 pt-6">
              {navLinks}
              <div className="border-t border-dark-border pt-4 mt-4">
                {user ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-foreground">
                      <UserCircle className="h-5 w-5 text-vibrant-green" />
                      <span className="font-medium">{user.username}</span>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-destructive text-destructive hover:bg-destructive/20 bg-transparent"
                      onClick={() => {
                        logout()
                        setIsSheetOpen(false)
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link href="/login" onClick={() => setIsSheetOpen(false)}>
                      <Button
                        variant="outline"
                        className="w-full border-electric-blue text-electric-blue hover:bg-electric-blue/20 bg-transparent"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link href="/register" onClick={() => setIsSheetOpen(false)}>
                      <Button className="w-full bg-vibrant-green text-primary-foreground hover:bg-vibrant-green/80">
                        Register
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* User/Auth Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-2">
              <UserCircle className="h-5 w-5 text-vibrant-green" />
              <span className="text-sm font-medium text-foreground hidden sm:inline">{user.username}</span>
              <Button variant="ghost" size="icon" onClick={logout} aria-label="Logout">
                <LogOut className="h-5 w-5 text-muted-foreground hover:text-destructive transition-colors" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-electric-blue text-electric-blue hover:bg-electric-blue/20 bg-transparent"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-vibrant-green text-primary-foreground hover:bg-vibrant-green/80">Register</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
