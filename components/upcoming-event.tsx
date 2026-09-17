import Image from "next/image"
import { Calendar, MapPin, Users, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

export function UpcomingEvent() {
  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-white via-[#FDF8F3] to-white border-y border-[#8D5B3E]/10 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#D4AF37]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 left-10 w-96 h-96 bg-[#8D5B3E]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-4xl text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 mb-6">
            <Sparkles className="h-4 w-4 text-[#D4AF37]" />
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#D4AF37]">
              Exclusive Opportunity
            </p>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-[#3E2C1C] mb-6">
            Realtor's Escape
          </h2>
          <p className="text-lg md:text-xl text-[#6D5D56] leading-relaxed max-w-3xl mx-auto">
            What happens when the sharpest realtors gather in one unforgettable moment?
          </p>
          <p className="text-base md:text-lg text-[#6D5D56] leading-relaxed max-w-3xl mx-auto mt-4">
            Real conversations. Meaningful networking. Unexpected collaborations. Connections that could reshape your entire career.
          </p>
        </div>

        {/* Event Flyer with Enhanced Styling */}
        <div className="mx-auto max-w-4xl mb-16">
          <div className="group relative">
            {/* Glow effect behind flyer */}
            <div className="absolute -inset-2 bg-gradient-to-r from-[#D4AF37]/20 to-[#8D5B3E]/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

            {/* Flyer container */}
            <div className="relative aspect-[10/13] md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500 transform group-hover:scale-105 group-hover:-rotate-1 origin-center">
              <Image
                src="/events/realtors-escape.jpg"
                alt="Realtor's Escape - An Exclusive Luxury Yacht Party for Top-Performing Realtors"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                quality={90}
              />

              {/* Overlay badge */}
              <div className="absolute top-4 right-4 bg-[#D4AF37] text-[#3E2C1C] px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                25 Spots Only
              </div>
            </div>
          </div>
        </div>

        {/* Event Details Grid */}
        <div className="mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Date & Time */}
            <div className="group bg-white rounded-2xl p-6 border border-[#8D5B3E]/10 hover:border-[#D4AF37]/50 hover:shadow-lg transition-all duration-300 hover:bg-gradient-to-br hover:from-[#FDF8F3] hover:to-white">
              <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] mb-4 group-hover:bg-[#D4AF37]/30 transition-colors">
                <Calendar className="h-7 w-7" />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-2">
                Date & Time
              </p>
              <p className="text-lg font-bold text-[#3E2C1C] mb-1">
                September 26th
              </p>
              <p className="text-sm text-[#6D5D56]">2:00 PM WAT</p>
            </div>

            {/* Capacity */}
            <div className="group bg-white rounded-2xl p-6 border border-[#8D5B3E]/10 hover:border-[#D4AF37]/50 hover:shadow-lg transition-all duration-300 hover:bg-gradient-to-br hover:from-[#FDF8F3] hover:to-white">
              <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] mb-4 group-hover:bg-[#D4AF37]/30 transition-colors">
                <Users className="h-7 w-7" />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-2">
                Exclusive Access
              </p>
              <p className="text-lg font-bold text-[#3E2C1C] mb-1">
                25 Top Realtors
              </p>
              <p className="text-sm text-[#6D5D56]">Limited spots available</p>
            </div>

            {/* Location */}
            <div className="group bg-white rounded-2xl p-6 border border-[#8D5B3E]/10 hover:border-[#D4AF37]/50 hover:shadow-lg transition-all duration-300 hover:bg-gradient-to-br hover:from-[#FDF8F3] hover:to-white">
              <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] mb-4 group-hover:bg-[#D4AF37]/30 transition-colors">
                <MapPin className="h-7 w-7" />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-2">
                Location
              </p>
              <p className="text-lg font-bold text-[#3E2C1C] mb-1">
                Luxury Yacht
              </p>
              <p className="text-sm text-[#6D5D56]">Sent to qualified realtors</p>
            </div>
          </div>

          {/* Qualification & CTA */}
          <div className="bg-gradient-to-r from-[#3E2C1C] to-[#5C3E2E] rounded-3xl p-8 md:p-12 text-white shadow-2xl overflow-hidden relative">
            {/* Decorative background */}
            <div className="absolute -right-20 -top-20 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                How to Qualify
              </h3>
              <div className="space-y-4 mb-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#D4AF37] text-[#3E2C1C] font-bold">
                      ✓
                    </div>
                  </div>
                  <p className="text-white/90">Close property worth 100 million naira</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#D4AF37] text-[#3E2C1C] font-bold">
                      ✓
                    </div>
                  </div>
                  <p className="text-white/90">Close units at Cisca Villa</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#D4AF37] text-[#3E2C1C] font-bold">
                      ✓
                    </div>
                  </div>
                  <p className="text-white/90">Close an acre deal on any 1159 Realty listed property</p>
                </div>
              </div>

              <div className="border-t border-white/20 pt-8">
                <p className="text-white/80 mb-6">
                  Your path to this exclusive event starts with action. Start closing deals today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://bit.ly/RealtorsEscape"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#D4AF37] hover:bg-[#E8C550] text-[#3E2C1C] font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    Register Now
                    <ArrowRight className="h-5 w-5" />
                  </a>
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg border border-white/30"
                  >
                    Join the Tribe
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
