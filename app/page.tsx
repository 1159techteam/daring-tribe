import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { BuddyApp } from "@/components/buddy-app"
import { HomeProof } from "@/components/home-proof"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { Target, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <Navigation />
      <Hero />
      <HowItWorks />
      <BuddyApp />
      <HomeProof />

      <section className="py-16 md:py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh-3 opacity-70" />

        <div className="container px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 mb-8 shadow-xl glow-accent animate-float">
              <Target className="h-10 w-10 md:h-12 md:w-12 text-accent" />
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
              Our <span className="text-accent">Mission</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10">
              To empower young professionals with world-class training, cutting-edge technology, and unwavering support to dominate the real estate market and build generational wealth.
            </p>

            <Button
              size="lg"
              className="bg-[#8D5B3E] hover:bg-[#A06B4A] text-white font-bold px-10 py-7 rounded-xl"
              asChild
            >
              <Link href="/signup" className="inline-flex items-center gap-2">
                Join the Tribe
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <p className="mt-6 text-sm text-muted-foreground">
              Join free · No experience needed · Start today
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
