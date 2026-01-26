import { Card } from "@/components/ui/card"
import { Briefcase, Users2, GraduationCap, TrendingUp, Shield, Sparkles, Database, MessageSquare } from "lucide-react"

const benefits = [
  {
    icon: Briefcase,
    title: "Exclusive Lead Pipeline",
    description:
      "Access to pre-qualified leads from 1159 Realty's extensive network and marketing campaigns valued at $50K+ annually.",
  },
  {
    icon: GraduationCap,
    title: "World-Class Training",
    description:
      "Over 200 hours of comprehensive training covering sales psychology, negotiation mastery, market analysis, and closing techniques.",
  },
  {
    icon: Users2,
    title: "Elite Mentorship Network",
    description:
      "One-on-one coaching from top 1% producers who have collectively closed over $5 billion in real estate transactions.",
  },
  {
    icon: TrendingUp,
    title: "Proven Systems & Tools",
    description:
      "Battle-tested CRM, automation workflows, scripts, templates, and playbooks that have generated billions in sales.",
  },
  {
    icon: Shield,
    title: "Legal & Compliance Support",
    description:
      "24/7 access to real estate attorneys and compliance experts to protect your business and ensure all deals close smoothly.",
  },
  {
    icon: Database,
    title: "Market Intelligence",
    description:
      "Real-time market data, predictive analytics, and insider insights to identify opportunities before your competition.",
  },
  {
    icon: MessageSquare,
    title: "Marketing Resources",
    description:
      "Professional photography, videography, copywriting, social media management, and advertising credit worth $25K annually.",
  },
  {
    icon: Sparkles,
    title: "Performance Incentives",
    description:
      "Lucrative bonus structures, exotic trips, luxury rewards, and recognition programs celebrating your achievements.",
  },
]

export function Benefits() {
  return (
    <section className="relative py-16 sm:py-24 bg-secondary overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/modern-luxury-office-interior-with-floor-to-ceilin.jpg"
          alt="Office background"
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      <div className="container px-4 relative z-10">
        <div className="mx-auto max-w-4xl text-center mb-12 sm:mb-16">
          <h2 className="mb-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-secondary-foreground text-balance">
            Unmatched Benefits & Support
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground text-pretty">
            When you join the Daring Tribe, you gain access to a complete ecosystem designed to accelerate your success
            and maximize your earning potential.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-secondary-foreground/10 bg-card/80 backdrop-blur-sm p-4 sm:p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="mb-3 sm:mb-4 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-110">
                <benefit.icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <h3 className="mb-2 font-display text-base sm:text-lg md:text-xl font-bold text-card-foreground">
                {benefit.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
