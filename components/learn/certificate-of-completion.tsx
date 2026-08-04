import Image from "next/image"

type Props = {
  title: string
  recipientName: string
  certificateCode: string
  issuedAt: string
  courseSlug?: string | null
}

/** Formal landscape certificate of completion: Tribe cream / gold / brown */
export function CertificateOfCompletion({
  title,
  recipientName,
  certificateCode,
}: Props) {
  return (
    <article
      className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-sm shadow-[0_24px_60px_rgba(62,44,28,0.22)]"
      style={{ aspectRatio: "1.414 / 1" }}
    >
      {/* Parchment field */}
      <div className="absolute inset-0 bg-[#FBF7EE]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 10%, rgba(212,175,55,0.18), transparent 45%), radial-gradient(ellipse at 80% 90%, rgba(141,91,62,0.12), transparent 40%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0 3px, rgba(62,44,28,0.35) 3px 4px)",
        }}
      />

      {/* Outer double frame */}
      <div className="absolute inset-2 border-[3px] border-[#C9A227] sm:inset-3" />
      <div className="absolute inset-3 border border-[#3E2C1C]/35 sm:inset-4" />
      <div className="absolute inset-4 border border-[#D4AF37]/50 sm:inset-5" />

      {/* Corner ornaments */}
      {[
        "top-5 left-5 sm:top-6 sm:left-6 rotate-0",
        "top-5 right-5 sm:top-6 sm:right-6 rotate-90",
        "bottom-5 left-5 sm:bottom-6 sm:left-6 -rotate-90",
        "bottom-5 right-5 sm:bottom-6 sm:right-6 rotate-180",
      ].map((pos) => (
        <svg
          key={pos}
          className={`pointer-events-none absolute h-7 w-7 text-[#C9A227] sm:h-9 sm:w-9 ${pos}`}
          viewBox="0 0 36 36"
          fill="none"
          aria-hidden
        >
          <path
            d="M2 34 V14 Q2 2 14 2 H34"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="square"
          />
          <path
            d="M8 34 V18 Q8 8 18 8 H34"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.55"
          />
          <circle cx="8" cy="8" r="1.6" fill="currentColor" />
        </svg>
      ))}

      {/* Content */}
      <div className="relative flex h-full flex-col items-center justify-between px-8 py-7 text-center sm:px-14 sm:py-10">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#8D5B3E] sm:text-[10px]">
            School for the Daring
          </p>
          <p className="mt-1 font-display text-lg font-bold tracking-tight text-[#3E2C1C] sm:text-2xl">
            Daring <span className="text-[#C9A227]">Tribe</span>
          </p>
          <div className="mx-auto mt-2 h-px w-24 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent sm:w-36" />
        </div>

        <div className="my-2 sm:my-3">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8D5B3E] sm:text-xs">
            Certificate of Completion
          </p>
          <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-[#6D5D56] sm:mt-4 sm:text-xs">
            This certifies that
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold italic leading-tight text-[#3E2C1C] sm:mt-2 sm:text-4xl md:text-5xl">
            {recipientName}
          </h2>
          <div className="mx-auto mt-2 h-px w-40 bg-[#C9A227]/70 sm:mt-3 sm:w-56" />
          <p className="mt-3 text-[10px] text-[#6D5D56] sm:mt-4 sm:text-sm">
            has successfully completed the course
          </p>
          <h3 className="mt-1.5 font-display text-lg font-bold uppercase tracking-wide text-[#3E2C1C] sm:mt-2 sm:text-2xl md:text-3xl">
            {title}
          </h3>
        </div>

        <div className="flex w-full items-end justify-between gap-4 pt-1">
          <div className="min-w-0 flex-1 text-left">
            <p
              className="text-sm leading-none text-[#3E2C1C] sm:text-base"
              style={{
                fontFamily:
                  '"Segoe Script", "Brush Script MT", "Apple Chancery", "Lucida Handwriting", cursive',
              }}
            >
              Opemipo Akingbade
            </p>
            <div className="mt-0.5 h-px w-full max-w-[120px] bg-[#3E2C1C]/25" />
            <p className="mt-0.5 text-[8px] leading-tight text-[#6D5D56]">
              Opemipo Akingbade
            </p>
            <p className="text-[8px] leading-tight text-[#6D5D56]">
              Community Manager
            </p>
            <p className="text-[8px] leading-tight text-[#6D5D56]">1159Realty</p>
          </div>

          <Image
            src="/certificate-seal.png"
            alt=""
            width={112}
            height={112}
            className="h-20 w-20 shrink-0 object-contain sm:h-28 sm:w-28"
            aria-hidden
          />
        </div>

        <p className="mt-2 font-mono text-[8px] tracking-wide text-[#6D5D56]/80 sm:text-[10px]">
          ID {certificateCode}
        </p>
      </div>
    </article>
  )
}
