"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/components/providers/auth-provider"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { user, loading } = useAuth()

  const isActive = (path: string) =>
    pathname === path || (path !== "/" && pathname.startsWith(path))

  const links = [
    { href: "/about", label: "About" },
    { href: "/learn", label: "Learn" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex flex-col">
              <span className="font-display text-xl sm:text-2xl font-bold text-foreground">
                Daring <span className="text-accent">Tribe</span>
              </span>
              <span className="text-[10px] sm:text-xs text-muted-foreground">Powered by 1159 Realty</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium hover:text-accent transition-colors ${
                  isActive(l.href) ? "text-accent" : ""
                }`}
              >
                {l.label}
              </Link>
            ))}
            {!loading && user ? (
              <Button size="sm" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <Link href="/profile">Profile</Link>
              </Button>
            ) : (
              <Button size="sm" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <Link href="/signup">Join Tribe</Link>
              </Button>
            )}
          </div>

          <button
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden py-4 space-y-2 border-t border-border">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`block py-2 text-sm font-medium hover:text-accent transition-colors ${
                  isActive(l.href) ? "text-accent" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 mt-2" asChild>
              <Link href={user ? "/profile" : "/signup"} onClick={() => setIsOpen(false)}>
                {user ? "Profile" : "Join Tribe"}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
