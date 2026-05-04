import { ArrowRight, Trophy, Star, Flame, BarChart2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: Flame,
    label: "Complete Quests",
    desc: "Real activities- joining training sessions, group engagement, social media engagements, quizzes participation, and closing",
  },
  {
    icon: Star,
    label: "Earn XP & Redeem Rewards",
    desc: "Stack experience points and trade them in for real incentives.",
  },
  {
    icon: BarChart2,
    label: "Track Your Performance",
    desc: "See your progress, rank, and growth all within your organization.",
  },
]

export function BuddyApp() {
  return (
    <section className="py-20 md:py-28 bg-[#FAF9F6] relative overflow-hidden">
      {/* Subtle radial pattern matching hero */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `repeating-radial-gradient(circle at 90% 50%, #8D5B3E 0, #8D5B3E 80px, transparent 81px, transparent 82px)`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Gold top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">

            {/* --- LEFT: TEXT + CTA --- */}
            <div className="flex-1 text-left max-w-xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-2 text-xs font-bold text-[#8D5B3E] uppercase tracking-wider mb-6">
                <Trophy className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>Gamified Real Estate</span>
              </div>

              <div className="mb-4">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] text-[#3E2F28] tracking-tight">
                  Quests, Rewards
                  <br className="hidden sm:block" />
                  <span className="text-[#D4AF37]">&amp; Growth</span>{" "}
                  <span className="font-serif italic text-[#8D5B3E] font-normal">
                    in one place
                  </span>
                </h2>
                <div className="mt-3 h-1 w-24 bg-gradient-to-r from-[#8D5B3E] via-[#D4AF37] to-[#8D5B3E] rounded-full" />
              </div>

              <p className="text-base md:text-lg text-[#6D5D56] leading-relaxed mt-6 mb-10 font-medium">
                Complete quests, earn XP, redeem rewards, and track your performance — all within your organization. Your real estate journey, gamified.
              </p>

              <Button
                size="lg"
                className="bg-[#8D5B3E] hover:bg-[#724932] text-white font-bold px-10 py-7 text-base rounded-xl shadow-[0_20px_40px_rgba(141,91,62,0.25)] transition-all active:scale-95"
                asChild
              >
                <a
                  href="https://buddy.1159realty.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  Start Playing
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
            </div>

            {/* --- RIGHT: FEATURE CARDS --- */}
            <div className="flex-1 w-full grid gap-4">
              {features.map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="group flex items-start gap-5 bg-white rounded-2xl px-6 py-5 border border-[#F3EFE9] shadow-sm hover:shadow-md hover:border-[#D4AF37]/30 transition-all"
                >
                  <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-colors">
                    <Icon className="h-5 w-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#3E2F28] mb-0.5">{label}</p>
                    <p className="text-sm text-[#6D5D56] leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}

              {/* Decorative tagline card */}
              <div className="flex items-center gap-3 px-6 py-4 rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/5">
                <span className="text-2xl">🏆</span>
                <p className="text-sm font-semibold text-[#8D5B3E]">
                  Your grind earns more than a commission — it earns you a crown.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Gold bottom border accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
    </section>
  )
}
