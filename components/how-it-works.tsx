import { UserPlus, BookOpen, Trophy } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    title: "Sign up",
    desc: "Create one free account for Daring Tribe and Buddy App — no second signup.",
  },
  {
    icon: BookOpen,
    title: "Complete courses",
    desc: "Train in the School for the Daring. Finish lessons to earn XP.",
  },
  {
    icon: Trophy,
    title: "Earn & play on Buddy App",
    desc: "Your XP shows on Buddy App. Compete, redeem rewards, and climb.",
  },
]

export function HowItWorks() {
  return (
    <section className="relative border-y border-[#8D5B3E]/10 bg-[#F5F5F0] py-16 md:py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            How it works
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-[#3E2C1C] md:text-4xl">
            Your path into the Tribe
          </h2>
          <p className="mt-3 text-[#6D5D56]">
            Three clear steps. No guesswork.
          </p>
        </div>

        <ol className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, desc }, i) => (
            <li key={title} className="relative text-center md:text-left">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8D5B3E]/10 text-[#8D5B3E] md:mx-0">
                <Icon className="h-6 w-6" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                Step {i + 1}
              </p>
              <h3 className="mt-1 text-xl font-bold text-[#3E2C1C]">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6D5D56]">{desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
