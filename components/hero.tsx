import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Award } from "lucide-react"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FAF9F6] pt-16 pb-12 md:pt-20 md:pb-0">

      {/* --- BRAND BACKGROUND PATTERN --- */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `repeating-radial-gradient(circle at 10% 10%, #8D5B3E 0, #8D5B3E 80px, transparent 81px, transparent 82px)`,
          backgroundSize: '200px 200px'
        }}
      />

      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-20">

          {/* --- CONTENT COLUMN --- */}
          <div className="flex-1 text-left max-w-2xl order-1">
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#8D5B3E]/20 bg-[#8D5B3E]/5 px-4 py-2 text-[10px] md:text-xs font-bold text-[#8D5B3E] uppercase tracking-wider">
                <Users className="h-3 w-3 md:h-4 md:w-4" />
                <span>700+ Active Realtors</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#8D5B3E]/20 bg-[#8D5B3E]/5 px-4 py-2 text-[10px] md:text-xs font-bold text-[#8D5B3E] uppercase tracking-wider">
                <Award className="h-3 w-3 md:h-4 md:w-4" />
                <span>Powered by 1159 Realty</span>
              </div>
            </div>

            <div className="space-y-6">
              {/* MOTTO: Learn . Earn . Win */}
              <div className="inline-block">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#8D5B3E] tracking-wide mb-2">
                  Learn <span className="text-[#D4AF37]">.</span> Earn <span className="text-[#D4AF37]">.</span> Win
                </h2>
                <div className="h-1 bg-gradient-to-r from-[#8D5B3E] via-[#D4AF37] to-[#8D5B3E] rounded-full"></div>
              </div>

              <p className="text-[#8D5B3E] text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
                The future knows only two words
              </p>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] text-[#3E2F28] tracking-tight">
                Young & <br />
                <span className="font-sans font-bold text-[#8D5B3E]">Daring</span>
              </h1>

              <p className="text-base md:text-xl text-[#6D5D56] max-w-lg leading-relaxed font-medium">
                Step into the world of real estate, master the art of selling and start earning today with a community that supports your every step.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-[#8D5B3E] hover:bg-[#A06B4A] text-white font-bold px-10 py-8 text-lg rounded-xl shadow-[0_20px_40px_rgba(141,91,62,0.25)] hover:shadow-[0_24px_48px_rgba(141,91,62,0.35)] hover:-translate-y-0.5 transition-all active:scale-95"
                asChild
              >
                <a href="/signup" className="flex items-center gap-2">
                  Join the Tribe
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>

              <Button
                size="lg"
                variant="ghost"
                className="w-full sm:w-auto text-[#724932] hover:text-[#8D5B3E] hover:bg-[#8D5B3E]/5 font-semibold px-6 py-8 text-base transition-all"
                asChild
              >
                <a href="/learn" className="flex items-center gap-2">
                  Explore courses
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>

            <p className="mt-8 text-sm text-[#6D5D56]">
              Join free · Train on-site · Earn XP that syncs with Buddy App
            </p>
          </div>

          {/* --- IMAGE COMPOSITION WITH RESONATING BACKGROUNDS --- */}
          <div className="flex-1 relative flex items-center justify-center lg:justify-end order-2 mt-8 lg:mt-0">
            <div className="relative flex gap-4 md:gap-8 items-center">

              {/* Card 1: Elevated */}
              <div className="relative -mt-8 md:-mt-20 group">
                {/* 1. THE RESONATING BLOB: Creates a warm glow behind the image */}
                <div className="absolute inset-0 bg-[#8D5B3E]/20 blur-[60px] rounded-full scale-110 opacity-50 group-hover:opacity-100 transition-opacity" />

                {/* 2. THE OFFSET BORDER: Adds architectural depth */}
                <div className="absolute inset-0 border-2 border-[#8D5B3E]/10 rounded-[2rem] md:rounded-[3.5rem] translate-x-4 translate-y-4 -z-10" />

                <div className="absolute -top-4 -right-4 md:-right-8 z-20 bg-white px-3 md:px-5 py-2 md:py-3 rounded-xl shadow-xl border border-[#F3EFE9] flex items-center gap-2">
                  <span className="font-sans font-medium text-[#3E2F28] text-[10px] md:text-sm">Learn & Earn</span> 🤙🏾
                </div>
                <div className="w-[140px] h-[200px] sm:w-[220px] sm:h-[320px] md:w-[300px] md:h-[420px] relative rounded-[2rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl border-4 md:border-[8px] border-white bg-gradient-to-r">
                  <Image
                    src="/adeola.png"
                    alt="Young Realtor Team"
                    fill
                    priority
                    sizes="(max-width: 768px) 140px, 300px"
                    className="object-cover transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Card 2: Lowered */}
              <div className="relative mt-8 md:mt-20 group">
                {/* 1. THE RESONATING BLOB: Soft warm glow */}
                <div className="absolute inset-0 bg-[#D4A373]/20 blur-[60px] rounded-full scale-110 opacity-50 group-hover:opacity-100 transition-opacity" />

                {/* 2. THE OFFSET BORDER: Mirrored side */}
                <div className="absolute inset-0 border-2 border-[#8D5B3E]/10 rounded-[2rem] md:rounded-[3.5rem] -translate-x-4 translate-y-4 -z-10" />

                <div className="w-[140px] h-[200px] sm:w-[220px] sm:h-[320px] md:w-[300px] md:h-[420px] relative rounded-[2rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl border-4 md:border-[8px] border-white bg-[#9c682cb9]">
                  <Image
                    src="/ope.jpeg"
                    alt="Young Real Estate Investor"
                    fill
                    priority
                    sizes="(max-width: 768px) 140px, 300px"
                    className="object-cover transition-transform duration-700"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 md:-left-8 z-20 bg-white px-3 md:px-5 py-2 md:py-3 rounded-xl shadow-xl border border-[#F3EFE9] flex items-center gap-2">
                  <span className="font-sans font-medium text-[#3E2F28] text-[10px] md:text-sm">Win Together</span> ✌🏾
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}