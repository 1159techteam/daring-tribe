import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, GraduationCap, ExternalLink, Clock, Award } from "lucide-react"

export function Training() {
  return (
    <section id="courses" className="py-16 sm:py-20 bg-background">
      <div className="container px-4">
        <div className="mx-auto max-w-4xl text-center mb-10 sm:mb-12">
          <p className="mb-2 sm:mb-3 text-accent text-sm sm:text-base font-bold tracking-wider uppercase">
            Step 2: Start Your Learning Journey
          </p>
          <h2 className="mb-3 sm:mb-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-balance">
            Comprehensive <span className="text-accent">Training Curriculum</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground text-pretty">
            World-class training designed to transform you into a market-dominating real estate professional
          </p>
        </div>

        {/* Google Classroom CTA - Most Important */}
        <div className="max-w-3xl mx-auto mb-12 sm:mb-16">
          <Card className="p-6 sm:p-8 bg-gradient-to-br from-accent/10 to-primary/10 border-2 border-accent/30">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/20 mb-4">
                <GraduationCap className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3">
                Join Our Google Classroom
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-xl mx-auto">
                Access all our courses, materials, and assignments in one organized platform. Click below to join our exclusive training class.
              </p>
              <Button size="lg" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <a href="https://classroom.google.com" target="_blank" rel="noopener noreferrer">
                  <GraduationCap className="h-5 w-5" />
                  Join Google Classroom Now
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </Card>
        </div>

        {/* Training Highlights - Compact */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12">
            <div className="text-center p-6 rounded-xl bg-card border-2 border-border">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 mb-3">
                <BookOpen className="h-6 w-6 text-accent" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-foreground mb-1">89</div>
              <div className="text-sm text-muted-foreground">Total Courses</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-card border-2 border-border">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-3">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-foreground mb-1">265+</div>
              <div className="text-sm text-muted-foreground">Training Hours</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-card border-2 border-border">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 mb-3">
                <Award className="h-6 w-6 text-accent" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-foreground mb-1">6</div>
              <div className="text-sm text-muted-foreground">Core Modules</div>
            </div>
          </div>

          {/* Module List - Very Compact */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {[
              "Foundation Mastery",
              "Sales Excellence",
              "Marketing & Branding",
              "Communication Skills",
              "Business Systems",
              "Advanced Strategies",
            ].map((module, index) => (
              <div
                key={index}
                className="p-3 sm:p-4 rounded-lg bg-secondary border border-border text-center"
              >
                <p className="text-xs sm:text-sm font-semibold text-foreground">{module}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
