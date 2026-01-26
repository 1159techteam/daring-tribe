import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Home, BookOpen, Cpu, TrendingUp, Globe } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F0] font-poppins selection:bg-[#D4AF37] selection:text-white">
      <Navigation />

      {/* --- PRO HERO: SPLIT COMPOSITION --- */}
      <section className="relative pt-16 lg:pt-24 pb-12 overflow-hidden">
        <div className="container px-6 mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-end">
            <div className="lg:w-2/3 space-y-8 z-10">
              <div className="inline-flex items-center gap-3">
                <span className="w-12 h-[1px] bg-[#D4AF37]"></span>
                <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.4em]">
                  The Vision
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl xl:text-9xl font-bold text-[#3E2C1C] leading-[0.85] tracking-tighter font-cinzel">
                Dare to <br />
                <span className="italic text-[#D4AF37] font-normal">Empower.</span>
              </h1>
              <p className="text-xl md:text-2xl text-[#3E2C1C]/70 leading-relaxed max-w-xl">
                We are building a movement of young Nigerians to create jobs and become impactful leaders, using <span className="text-[#3E2C1C] font-semibold italic">Real Estate</span> as our anchor.
              </p>
            </div>

            {/* The "Anchor" Image - Gives the hero weight */}
            <div className="lg:w-1/3 w-full relative">
              <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl border-[12px] border-white">
                <Image
                  src="/hero-about-sfd.jpg"
                  alt="SFD Leadership"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating Stat Badge */}
              <div className="absolute -bottom-6 -left-6 bg-[#3E2C1C] text-white p-6 rounded-2xl shadow-xl">
                {/* <p className="text-3xl font-bold font-cinzel text-[#D4AF37]">246K</p> */}
                <p className="text-[10px] uppercase tracking-widest opacity-70">Daring tribe</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- THE CORE MISSION: DARK MODE CONTRAST --- */}
      <section className="py-24 bg-[#3E2C1C] text-[#F5F5F0] rounded-[4rem] mx-4 my-12">
        <div className="container px-6 mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold font-cinzel leading-tight">
                Our Mission is <br />
                <span className="text-[#D4AF37]">Global Impact.</span>
              </h2>
              {/* <p className="text-lg opacity-80 leading-relaxed">
                Touring 2 universities in each of the 36 states, delivering events that connect 30,000 on-site and 216,000 online students with investment journeys.
              </p> */}
              <div className="pt-4">
                <Link
                  href="/course"
                  className="
    group inline-flex items-center justify-center 
    bg-[#D4AF37] text-white 
    rounded-full px-10 py-5 
    font-poppins font-bold text-sm tracking-[0.15em] uppercase
    shadow-[0_10px_30px_-10px_rgba(212,175,55,0.5)]
    hover:bg-[#3E2C1C] hover:shadow-[0_15px_35px_-10px_rgba(62,44,28,0.4)]
    hover:-translate-y-1
    transition-all duration-300 ease-out
    active:scale-95
  "
                >
                  Join the Movement
                  <ArrowUpRight className="ml-3 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square bg-white/5 rounded-3xl flex flex-col justify-center items-center border border-white/10 p-6 text-center">
                <Globe className="text-[#D4AF37] mb-4 w-8 h-8" />
                <p className="text-3xl font-bold font-cinzel">36</p>
                <p className="text-[10px] uppercase tracking-widest opacity-60">States Covered</p>
              </div>
              <div className="aspect-square bg-white/5 rounded-3xl flex flex-col justify-center items-center border border-white/10 p-6 text-center">
                <TrendingUp className="text-[#D4AF37] mb-4 w-8 h-8" />
                <p className="text-3xl font-bold font-cinzel">30K</p>
                <p className="text-[10px] uppercase tracking-widest opacity-60">On-Site Impact</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- THE 4 PILLARS: CLEAN ARCHITECTURAL GRID --- */}
      <section className="py-32 container px-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <h2 className="text-5xl font-bold text-[#3E2C1C] font-cinzel mb-6">Essential Pillars</h2>
            <p className="text-[#3E2C1C]/60 italic font-poppins">The foundation of everything we build at the School for the Daring.</p>
          </div>
          <div className="text-[#D4AF37] font-cinzel text-8xl opacity-10 font-bold hidden lg:block">
            04
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#3E2C1C]/10 border-y border-[#3E2C1C]/10">
          {[
            { label: 'Real Estate', icon: <Home />, desc: 'The anchor of wealth creation and stability.' },
            { label: 'Education', icon: <BookOpen />, desc: 'Inspiring bold steps in personal growth.' },
            { label: 'Technology', icon: <Cpu />, desc: 'Modern tools for the daring entrepreneur.' },
            { label: 'Growth', icon: <TrendingUp />, desc: 'Empowering future impactful leaders.' }
          ].map((pillar) => (
            <div key={pillar.label} className="p-12 hover:bg-[#D4AF37]/5 transition-colors group">
              <div className="text-[#D4AF37] mb-8 transform group-hover:scale-110 group-hover:-rotate-12 transition-transform">
                {pillar.icon}
              </div>
              <h4 className="text-2xl font-bold text-[#3E2C1C] font-cinzel mb-4">{pillar.label}</h4>
              <p className="text-sm text-[#3E2C1C]/60 leading-relaxed font-poppins">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}