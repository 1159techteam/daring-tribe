"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Star, Quote, ArrowRight, Sparkles, TrendingUp } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function TestimonialPage() {
  const stories = [
    {
      name: "Olanrewaju Soliat Opeyemi",
      // role: "Land Investment Specialist, Ilorin",
      quote:
        "Joining the Daring Tribe gave me a strong foundation in real estate, boosting my confidence, skills, and mindset through consistent training and a supportive community.",
      rating: 5,
    },
    {
      name: "Abiola Amina Abidemi",
      quote: "1159 helped me take my first steps into real estate through practical training and strong support. With their guidance, I acquired land and helped others own farmland, selling to 12 people within two months.",
    },
    {
      name: "Balogun Mutmainnah",
      quote: "The Friday webinars really inspired me a lot. I learned so much from the speakers; it felt more like a mentorship program. Everything was structured in a very practical way, with speakers who genuinely guided us step by step. Honestly, I am truly blessed to be part of 1159REALTY.",
      highlight: "realestatequeen_ng",
      size: "small"
    },
    {
      name: "Abdulmalik Faruq",
      quote: "I sincerely appreciate the Daring Tribe community and its management. Being a member has been inspiring, and the weekly trainings have strengthened my confidence and ability to close deals. It’s truly a great place to grow with passion.",
      size: "small"
    },
    {
      name: "Christian Kuyet Martha",
      quote: "1159Realty is one of the best things that has ever happened to me. Being part of this brand is truly WEALTH. Wealth of knowledge and insight, teaching me how to rise above mediocrity and pursue excellence. Wealth of amazing, outstanding people who consistently guide, inspire, and support me as I dare to pursue my biggest dreams.",
      size: "small"
    },
  ];

  return (
    <main className="min-h-screen bg-[#F5F5F0] font-poppins selection:bg-[#D4AF37] selection:text-white">
      <Navigation />

      {/* --- HERO: THE LEGACY HEADER --- */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="container relative z-10 px-6 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">The Social Proof</span>
          </motion.div>

          <h1 className="text-6xl md:text-9xl font-bold font-cinzel leading-none text-[#3E2C1C] tracking-tighter mb-8">
            Voices of <br />
            <span className="italic text-[#D4AF37] font-normal">Impact.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-[#3E2C1C]/60 leading-relaxed font-light">
            Behind every number is a life changed. These are the entrepreneurs who dared to challenge the status quo and win.
          </p>
        </div>
      </section>

      {/* --- TESTIMONIALS MASONRY --- */}
      <section className="py-20 container px-6 mx-auto">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`break-inside-avoid bg-white p-8 md:p-10 rounded-[2.5rem] border border-[#3E2C1C]/5 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col ${story.size === 'large' ? 'bg-[#3E2C1C] text-white' : 'bg-white text-[#3E2C1C]'
                }`}
            >
              <div className="flex justify-between items-start mb-8">
                <div className={`p-3 rounded-2xl ${story.size === 'large' ? 'bg-white/10' : 'bg-[#F5F5F0]'}`}>
                  <TrendingUp className={`w-5 h-5 ${story.size === 'large' ? 'text-[#D4AF37]' : 'text-[#3E2C1C]'}`} />
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>
              </div>

              <Quote className={`w-12 h-12 mb-6 opacity-10 ${story.size === 'large' ? 'text-white' : 'text-[#3E2C1C]'}`} />

              <p className={`text-xl md:text-2xl font-light leading-relaxed mb-8 italic ${story.size === 'large' ? 'text-white/90' : 'text-[#3E2C1C]/80'
                }`}>
                "{story.quote}"
              </p>

              <div className="mt-auto pt-8 border-t border-current/10">
                <p className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-1">{story.highlight}</p>
                <h4 className="font-cinzel font-bold text-lg">{story.name}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- CTA: THE INVITATION --- */}
      <section className="py-32 container px-6 mx-auto text-center">
        <div className="bg-[#3E2C1C] rounded-[4rem] p-12 md:p-24 relative overflow-hidden shadow-3xl">
          {/* Decorative Background Circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-bold font-cinzel text-white leading-none mb-8 tracking-tighter">
              Ready to Write Your <br />
              <span className="text-[#D4AF37] italic font-normal">Own Chapter?</span>
            </h2>
            <p className="text-xl text-white/60 mb-12 font-light">
              Join 500+ professionals building generational wealth through the Daring Tribe frameworks.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/course" className="px-10 py-6 bg-[#D4AF37] text-white rounded-full font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-[#3E2C1C] transition-all duration-500 flex items-center justify-center gap-3 group">
                Apply to Join
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link href="/course" className="px-10 py-6 border border-white/20 text-white rounded-full font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center justify-center">
                Explore The Curriculum
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}