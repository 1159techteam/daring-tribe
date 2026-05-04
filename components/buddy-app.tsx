import { ArrowRight, Smartphone, Users2, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: Users2,
    label: "Find Your Buddy",
    desc: "Get matched with an accountability partner in the tribe.",
  },
  {
    icon: Zap,
    label: "Track Progress",
    desc: "Log deals, goals, and milestones together in real-time.",
  },
  {
    icon: Smartphone,
    label: "Stay Connected",
    desc: "Communicate, share wins, and push each other forward.",
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
              <div className="inline-flex items-center gap-2 rounded-full border border-[#8D5B3E]/20 bg-[#8D5B3E]/5 px-4 py-2 text-xs font-bold text-[#8D5B3E] uppercase tracking-wider mb-6">
                <Smartphone className="h-3.5 w-3.5" />
                <span>Now Available</span>
              </div>

              <div className="mb-4">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] text-[#3E2F28] tracking-tight">
                  Meet the{" "}
                  <span className="font-serif italic text-[#8D5B3E] font-normal">
                    Buddy
                  </span>{" "}
                  <br className="hidden sm:block" />
                  <span className="text-[#D4AF37]">App</span>
                </h2>
                <div className="mt-3 h-1 w-24 bg-gradient-to-r from-[#8D5B3E] via-[#D4AF37] to-[#8D5B3E] rounded-full" />
              </div>

              <p className="text-base md:text-lg text-[#6D5D56] leading-relaxed mt-6 mb-10 font-medium">
                Your accountability partner is one tap away. The Buddy App connects you with a fellow tribe member so you never grind alone — track goals, share wins, and level up together.
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
                  Open Buddy App
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
            </div>

            {/* --- RIGHT: FEATURE CARDS --- */}
            <div className="flex-1 w-full grid gap-4 sm:grid-cols-1">
              {features.map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="group flex items-start gap-5 bg-white rounded-2xl px-6 py-5 border border-[#F3EFE9] shadow-sm hover:shadow-md hover:border-[#8D5B3E]/20 transition-all"
                >
                  <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-[#8D5B3E]/10 flex items-center justify-center group-hover:bg-[#8D5B3E]/20 transition-colors">
                    <Icon className="h-5 w-5 text-[#8D5B3E]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#3E2F28] mb-0.5">{label}</p>
                    <p className="text-sm text-[#6D5D56] leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}

              {/* Decorative badge */}
              <div className="flex items-center gap-3 px-6 py-4 rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/5">
                <span className="text-2xl">🤝</span>
                <p className="text-sm font-semibold text-[#8D5B3E]">
                  No one wins alone — that's the Daring Tribe way.
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
