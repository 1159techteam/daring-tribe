import Link from "next/link"
import { Quote, ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const stories = [
  {
    name: "Olanrewaju Soliat Opeyemi",
    quote:
      "Joining the Daring Tribe gave me a strong foundation in real estate, boosting my confidence, skills, and mindset through consistent training and a supportive community.",
  },
  {
    name: "Abiola Amina Abidemi",
    quote:
      "1159 helped me take my first steps into real estate through practical training and strong support. With their guidance, I acquired land and helped others own farmland, selling to 12 people within two months.",
  },
  {
    name: "Abdulmalik Faruq",
    quote:
      "Being a member has been inspiring, and the weekly trainings have strengthened my confidence and ability to close deals. It's truly a great place to grow with passion.",
  },
]

export function HomeProof() {
  return (
    <section className="relative bg-[#FAF9F6] py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            Voices from the Tribe
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-[#3E2C1C] md:text-4xl">
            Real people. Real progress.
          </h2>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {stories.map((story) => (
            <figure
              key={story.name}
              className="flex flex-col rounded-3xl border border-[#3E2C1C]/8 bg-white p-7 shadow-sm"
            >
              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                ))}
              </div>
              <Quote className="mb-3 h-8 w-8 text-[#D4AF37]/40" />
              <blockquote className="flex-1 text-sm leading-relaxed text-[#3E2C1C]/80">
                “{story.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-[#3E2C1C]/8 pt-4 text-sm font-bold text-[#3E2C1C]">
                {story.name}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button
            asChild
            variant="outline"
            className="border-[#8D5B3E]/25 text-[#8D5B3E] hover:bg-[#8D5B3E] hover:text-white"
          >
            <Link href="/testimonials" className="inline-flex items-center gap-2">
              More stories
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
