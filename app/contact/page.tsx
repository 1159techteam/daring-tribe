"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Mail, Phone, MapPin, Instagram, Youtube, Facebook, Linkedin, ArrowUpRight } from "lucide-react"
import Image from "next/image"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F0] font-poppins selection:bg-[#D4AF37] selection:text-white">
      <Navigation />

      {/* --- HERO: THE STATEMENT --- */}
      {/* Adjusted padding for mobile (pt-32) vs desktop (pt-48) */}
      <section className="pt-32 md:pt-48 pb-12 md:pb-20 container px-6 mx-auto">
        <div className="max-w-5xl">
          <p className="text-[#D4AF37] font-bold text-xs uppercase tracking-[0.4em] mb-4">Get in touch</p>
          {/* Responsive Text: text-5xl on mobile, text-9xl on desktop */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold font-cinzel leading-[0.9] text-[#3E2C1C] tracking-tighter">
            Reach The <br />
            <span className="italic text-[#D4AF37] font-normal">Tribe.</span>
          </h1>
        </div>
      </section>

      {/* --- CONTENT: ARCHITECTURAL GRID --- */}
      <section className="pb-20 md:pb-32 container px-6 mx-auto">
        {/* Grid: 1 column on mobile, 12 on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 border-t border-[#3E2C1C]/10 pt-12 md:pt-16">

          {/* LEFT: THE PHYSICAL ANCHOR */}
          <div className="lg:col-span-7 w-full">
            <div className="relative aspect-[16/10] sm:aspect-video rounded-[2rem] md:rounded-[3rem] overflow-hidden group mb-8 md:mb-12 shadow-2xl">
              <Image
                src="/luxury-modern-real-estate-office-space.jpg"
                alt="Headquarters"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#3E2C1C]/40 group-hover:bg-[#3E2C1C]/20 transition-colors duration-500" />
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-8 max-w-xl">
              <div className="p-3 rounded-xl bg-[#3E2C1C] text-[#D4AF37] sm:bg-transparent sm:p-0">
                <MapPin className="w-6 h-6 md:w-8 md:h-8 shrink-0" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold font-cinzel text-[#3E2C1C] mb-4 text-balance leading-snug">
                  No. 23, Offa Road, Opposite Kwara State Registry, Ilorin, Kwara State.
                </h3>
                <p className="text-[#3E2C1C]/60 text-sm md:text-base leading-relaxed">
                  Our office is open for scheduled consultations and Daring Tribe hangouts.
                  Experience the energy of the school in person.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: THE DIGITAL BRIDGE */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-16">

            <div className="space-y-8 md:space-y-12">
              {/* Phone Channel */}
              <a href="tel:07063055656" className="group block">
                <div className="flex items-center justify-between border-b border-[#3E2C1C]/10 pb-6">
                  <div>
                    <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-1">Voice / WhatsApp</p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3E2C1C] font-cinzel group-hover:text-[#D4AF37] transition-colors break-all">
                      07063055656
                    </h2>
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-[#3E2C1C]/20 group-hover:text-[#D4AF37] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
                </div>
              </a>

              {/* Email Channel */}
              <a href="mailto:info@1159realty.com" className="group block">
                <div className="flex items-center justify-between border-b border-[#3E2C1C]/10 pb-6">
                  <div>
                    <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-1">Email Correspondence</p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3E2C1C] font-cinzel group-hover:text-[#D4AF37] transition-colors break-all">
                      info@1159realty.com
                    </h2>
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-[#3E2C1C]/20 group-hover:text-[#D4AF37] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
                </div>
              </a>
            </div>

            {/* SOCIAL ECOSYSTEM */}
            <div className="bg-[#3E2C1C] p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] text-white">
              <h4 className="font-cinzel font-bold text-lg md:text-xl mb-6 tracking-tight">Social Ecosystem</h4>
              {/* grid-cols-1 for very small screens, grid-cols-2 for tablet up */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {[
                  { name: 'Instagram', icon: Instagram, href: "http://www.instagram.com/1159_realty" },
                  { name: 'YouTube', icon: Youtube, href: "https://youtube.com/@1159realty" },
                  { name: 'Facebook', icon: Facebook, href: "http://www.facebook.com/1159realty" },
                  { name: 'LinkedIn', icon: Linkedin, href: "https://www.linkedin.com/company/1159realty/" }
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="flex items-center gap-3 p-4 rounded-xl md:rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-[10px] md:text-xs font-bold uppercase tracking-widest"
                  >
                    <social.icon className="w-4 h-4 text-[#D4AF37]" />
                    {social.name}
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}