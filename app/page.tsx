import { Hero } from "@/components/hero"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { Target } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <Navigation />
      <Hero />
      {/* Mission Statement - With Radial Gradient */}
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
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12 md:mb-16">
              To empower young professionals with world-class training, cutting-edge technology, and unwavering support to dominate the real estate market and build generational wealth.
            </p>

            <p className="mt-8 text-sm text-muted-foreground">
              Join the movement • No experience needed • Start today
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
