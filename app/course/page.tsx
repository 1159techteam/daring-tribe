"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  ExternalLink,
  ArrowRight,
  ClipboardCheck,
  PlayCircle,
  Award,
  CheckCircle2,
  GraduationCap
} from "lucide-react"
import Image from "next/image"

export default function CoursePage() {
  const [showTest, setShowTest] = useState(false)

  return (
    <main className="min-h-screen bg-[#F5F5F0]">
      <Navigation />

      {/* --- HERO SECTION: Responsive Height & Font Scaling --- */}
      <section className="relative min-h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/luxury-modern-real-estate-office-space.jpg"
            alt="SFD Training Academy"
            fill
            priority
            className="object-cover"
          />
          {/* Using official Dark Earth for overlay */}
          <div className="absolute inset-0 bg-[#3E2C1C]/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3E2C1C]/40 to-[#3E2C1C]" />
        </div>

        <div className="container relative z-10 px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 md:mb-6">
            <GraduationCap className="w-3 h-3 md:w-4 h-4" />
            The School For The Daring
          </div>
          {/* Font sizes: 3xl for mobile, 7xl for desktop */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tighter font-cinzel">
            Master the <span className="italic text-[#D4AF37] font-normal">Game</span>
          </h1>
          <p className="mt-4 md:mt-6 mx-auto max-w-2xl text-sm md:text-xl text-stone-300 font-poppins px-2">
            Your journey into the Daring Tribe begins with mastery. Select 'Access Classroom' below to complete your training, once finished, you will be invited to take the Validation exam.
          </p>
        </div>
      </section>

      {/* --- THE TWO-STEP JOURNEY: Mobile-First Grid --- */}
      <section className="pb-16 md:pb-24 bg-[#3E2C1C] relative z-20">
        {/* Negative Margin trick only for tablet/desktop to avoid overlapping issues on small phones */}
        <div className="container px-4 md:px-6 md:-mt-20">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-stretch">

            {/* STEP 1: GOOGLE CLASSROOM */}
            <div className="bg-[#2A2421] p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-white/5 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-[#D4AF37] flex items-center justify-center mb-6 md:mb-8 shadow-lg shadow-[#D4AF37]/20">
                  <PlayCircle className="text-white w-6 h-6 md:w-8 h-8" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4 font-cinzel">01. The Training</h2>
                <p className="text-stone-400 text-sm md:text-lg mb-6 md:mb-8 font-poppins">
                  Enter our official Google Classroom. Immerse yourself in the strategies used by the top 1% of the real estate industry.
                </p>
                <ul className="grid grid-cols-1 gap-3 mb-8 md:mb-10">
                  {['Real Estate Investment', 'Digital Technology', 'Wealth Growth'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-stone-300 font-medium text-xs md:text-sm font-poppins">
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col items-center gap-4">
                <Button
                  asChild
                  className="w-full py-6 md:py-8 text-sm md:text-lg font-bold bg-[#D4AF37] hover:bg-white hover:text-[#3E2C1C] transition-all rounded-xl md:rounded-2xl"
                >
                  <a href="https://classroom.google.com/c/ODQxMjc3ODcwNjY1?cjc=g6r747s2" target="_blank" rel="noopener noreferrer">
                    Introduction to Real Estate<ExternalLink className="ml-2 w-4 h-4 md:w-5 h-5" />
                  </a>
                </Button>
                <Button
                  asChild
                  className="w-full py-6 md:py-8 text-sm md:text-lg font-bold bg-[#D4AF37] hover:bg-white hover:text-[#3E2C1C] transition-all rounded-xl md:rounded-2xl"
                >
                  <a href="https://classroom.google.com/c/ODQxMjc4MzYwNjUx?cjc=4mdt3jjn" target="_blank" rel="noopener noreferrer">
                    1159 Ethics and Professionalism <ExternalLink className="ml-2 w-4 h-4 md:w-5 h-5" />
                  </a>
                </Button>
                <Button
                  asChild
                  className="w-full py-6 md:py-8 text-sm md:text-lg font-bold bg-[#D4AF37] hover:bg-white hover:text-[#3E2C1C] transition-all rounded-xl md:rounded-2xl"
                >
                  <a href="https://classroom.google.com/c/ODM3OTEzNTA0NzMz?cjc=p4i7w43u" target="_blank" rel="noopener noreferrer">
                    Access Classroom <ExternalLink className="ml-2 w-4 h-4 md:w-5 h-5" />
                  </a>
                </Button>
              </div>
            </div>

            {/* STEP 2: THE TEST GATEKEEPER */}
            <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-2xl flex flex-col justify-center items-center text-center">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-[#F5F5F0] border border-[#D4AF37]/20 flex items-center justify-center mb-4 md:mb-6">
                <ClipboardCheck className="text-[#D4AF37] w-6 h-6 md:w-8 h-8" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#3E2C1C] mb-3 md:mb-4 font-cinzel">02. Validation</h2>
              <p className="text-[#3E2C1C]/70 text-sm md:text-lg mb-6 md:mb-8 max-w-sm font-poppins">
                Have you completed your classes? Proving your mastery is the final step to your entrepreneurial badge.
              </p>

              {!showTest ? (
                <div className="space-y-4 w-full">
                  <p className="text-[10px] md:text-xs font-bold text-[#D4AF37] uppercase tracking-widest">Mastery Gate</p>
                  <Button
                    onClick={() => setShowTest(true)}
                    variant="outline"
                    className="w-full py-6 md:py-8 text-sm md:text-lg font-bold border-2 border-[#3E2C1C] text-[#3E2C1C] hover:bg-[#3E2C1C] hover:text-white transition-all rounded-xl md:rounded-2xl font-poppins"
                  >
                    Yes, Class Completed <ArrowRight className="ml-2 w-4 h-4 md:w-5 h-5" />
                  </Button>
                </div>
              ) : (
                <div className="w-full animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="p-4 md:p-6 bg-[#F5F5F0] rounded-xl md:rounded-2xl border-2 border-dashed border-[#D4AF37]/30 mb-4 md:mb-6">
                    <p className="text-[#D4AF37] font-bold text-xs md:text-sm uppercase tracking-tight">Test Unlocked 🔓</p>
                  </div>
                  <Button
                    className="w-full py-6 md:py-8 text-sm md:text-lg font-bold bg-[#3E2C1C] text-white rounded-xl md:rounded-2xl font-poppins"
                  >
                    Start Final Assessment
                  </Button>
                  <button
                    onClick={() => setShowTest(false)}
                    className="mt-4 text-[10px] md:text-xs text-[#3E2C1C]/50 underline uppercase tracking-widest"
                  >
                    Return to Classroom step
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* --- TEST SECTION: Mobile Content Padding --- */}
      {showTest && (
        <section id="test-section" className="py-16 md:py-24 bg-white animate-in slide-in-from-bottom-10 duration-700">
          <div className="container px-4 md:px-6 max-w-3xl mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <Award className="w-12 h-12 md:w-16 h-16 text-[#D4AF37] mx-auto mb-4 md:mb-6" />
              <h2 className="text-2xl md:text-4xl font-bold text-[#3E2C1C] font-cinzel">Official Certification</h2>
              <p className="text-[#3E2C1C]/60 mt-2 md:mt-4 text-sm md:text-base font-poppins">Answer precisely to complete your SFD journey.</p>
            </div>

            <div className="space-y-6 md:space-y-8 font-poppins">
              <div className="p-6 md:p-8 rounded-[1.5rem] md:rounded-3xl bg-[#F5F5F0] border border-[#D4AF37]/10">
                <p className="font-bold text-[#3E2C1C] mb-4 text-base md:text-xl">1. What is the anchor of The School for the Daring?</p>
                <div className="space-y-3">
                  {['Stock Market', 'Real Estate', 'Crypto'].map((opt) => (
                    <label key={opt} className="flex items-center gap-3 p-3 md:p-4 bg-white rounded-xl border border-stone-200 cursor-pointer hover:border-[#D4AF37] transition-all group">
                      <input type="radio" name="q1" className="accent-[#D4AF37] h-4 w-4" />
                      <span className="font-medium text-[#3E2C1C]/70 text-sm md:text-base group-hover:text-[#3E2C1C]">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
              <Button className="w-full py-6 md:py-8 bg-[#D4AF37] text-white text-sm md:text-lg font-bold rounded-xl md:rounded-2xl shadow-xl shadow-[#D4AF37]/20">
                Submit For Review
              </Button>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}