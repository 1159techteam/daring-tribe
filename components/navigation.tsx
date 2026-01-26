"use client"

import { Button } from "@/components/ui/button"
import { Menu, X, Heart } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex flex-col">
              <span className="font-display text-xl sm:text-2xl font-bold text-foreground">
                Daring <span className="text-accent">Tribe</span>
              </span>
              <span className="text-[10px] sm:text-xs text-muted-foreground">Powered by 1159 Realty</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <Link
              href="/about"
              className={`text-sm font-medium hover:text-accent transition-colors ${isActive("/about") ? "text-accent" : ""
                }`}
            >
              About
            </Link>
            <Link
              href="/testimonials"
              className={`text-sm font-medium hover:text-accent transition-colors ${isActive("/testimonials") ? "text-accent" : ""
                }`}
            >
              Testimonials
            </Link>
            <Link
              href="/course"
              className={`text-sm font-medium hover:text-accent transition-colors ${isActive("/course") ? "text-accent" : ""
                }`}
            >
              Course
            </Link>
            <Link
              href="/blog"
              className={`text-sm font-medium hover:text-accent transition-colors ${isActive("/blog") ? "text-accent" : ""
                }`}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-medium hover:text-accent transition-colors ${isActive("/contact") ? "text-accent" : ""
                }`}
            >
              Contact
            </Link>
            <Button size="sm" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <Link href="/course">
                Join Tribe
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 space-y-2 border-t border-border">
            <Link
              href="/about"
              className={`block py-2 text-sm font-medium hover:text-accent transition-colors ${isActive("/about") ? "text-accent" : ""
                }`}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/testimonials"
              className={`block py-2 text-sm font-medium hover:text-accent transition-colors ${isActive("/testimonials") ? "text-accent" : ""
                }`}
              onClick={() => setIsOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              href="/course"
              className={`flex items-center gap-2 py-2 text-sm font-medium hover:text-accent transition-colors ${isActive("/course") ? "text-accent" : ""
                }`}
              onClick={() => setIsOpen(false)}
            >
              Course
            </Link>
            <Link
              href="/blog"
              className={`block py-2 text-sm font-medium hover:text-accent transition-colors ${isActive("/blog") ? "text-accent" : ""
                }`}
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className={`block py-2 text-sm font-medium hover:text-accent transition-colors ${isActive("/contact") ? "text-accent" : ""
                }`}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 mt-2" asChild>
              <Link href="/course">
                Join Tribe
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
