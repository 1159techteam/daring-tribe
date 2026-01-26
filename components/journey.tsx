import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  MousePointerClick,
  GraduationCap,
  Link as LinkIcon,
  BookOpen,
  ClipboardCheck,
  FileCheck,
  Users,
  ArrowRight,
} from "lucide-react"

const steps = [
  {
    number: 1,
    icon: MousePointerClick,
    title: "Explore the Website",
    description: "Learn about our mission, services, and success stories",
  },
  {
    number: 2,
    icon: GraduationCap,
    title: "Visit Course Section",
    description: "Review our comprehensive training curriculum",
  },
  {
    number: 3,
    icon: LinkIcon,
    title: "Join Google Classroom",
    description: "Click the link to access our training platform",
  },
  {
    number: 4,
    icon: BookOpen,
    title: "Complete Courses",
    description: "Enroll and finish all assigned lessons",
  },
  {
    number: 5,
    icon: ClipboardCheck,
    title: "Pass the Exam",
    description: "Take and pass the certification assessment",
  },
  {
    number: 6,
    icon: FileCheck,
    title: "Submit Google Form",
    description: "Fill out and submit the application form",
  },
  {
    number: 7,
    icon: Users,
    title: "Join the Community",
    description: "Access the exclusive Daring Tribe community",
  },
]

export function Journey() {
  return (
    <section id="journey" className="relative py-12 sm:py-16 bg-secondary overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.75_0.12_80/0.08),transparent_60%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="mx-auto max-w-5xl text-center mb-8 sm:mb-12">
          <p className="mb-2 sm:mb-3 text-accent text-sm sm:text-base font-bold tracking-wider uppercase">
            Your Path to Success
          </p>
          <h2 className="mb-3 sm:mb-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-balance">
            How to Join the <span className="text-accent">Daring Tribe</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground text-pretty max-w-3xl mx-auto">
            A simple 7-step process to transform your real estate career
          </p>
        </div>

        {/* Compact Step Cards Grid */}
        <div className="mx-auto max-w-6xl mb-10 sm:mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step) => (
              <Card
                key={step.number}
                className="relative p-5 sm:p-6 border-border bg-card hover:border-accent/50 transition-all group"
              >
                {/* Step number badge */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-sm shadow-lg">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="mb-4 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <step.icon className="h-6 w-6 text-primary group-hover:text-accent transition-colors" />
                </div>

                {/* Content */}
                <h3 className="font-display text-base sm:text-lg font-bold text-card-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA to Courses Section */}
        <div className="text-center">
          <Button size="lg" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90" asChild>
            <a href="#courses">
              Start Your Journey - View Courses
              <ArrowRight className="h-5 w-5" />
            </a>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Join 500+ ambitious realtors transforming their careers
          </p>
        </div>
      </div>
    </section>
  )
}
