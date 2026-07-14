"use client"

import { useId } from "react"
import { getCadreStarColor, getCadreStarMetal } from "@/lib/learn/levels"

type Props = {
  slug: string
  size?: number
  className?: string
  title?: string
}

const STAR_PATH =
  "M16 2.2l3.55 7.2 7.95 1.16-5.75 5.6 1.36 7.92L16 20.4l-7.11 3.68 1.36-7.92-5.75-5.6 7.95-1.16L16 2.2z"

/**
 * Metallic 2go-style rank star — enamel fill with chrome highlight/shade.
 */
export function CadreStar({ slug, size = 22, className = "", title }: Props) {
  const fill = getCadreStarColor(slug)
  const metal = getCadreStarMetal(slug)
  const isUltimate = slug === "ultimate"
  const reactId = useId().replace(/:/g, "")
  const id = `cadre-star-${reactId}`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 drop-shadow-sm ${className}`}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      style={{ color: fill }}
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient id={`${id}-metal`} x1="18%" y1="0%" x2="82%" y2="100%">
          <stop offset="0%" stopColor={metal.highlight} />
          <stop offset="38%" stopColor={metal.mid} />
          <stop offset="72%" stopColor={metal.shade} />
          <stop offset="100%" stopColor={metal.mid} />
        </linearGradient>
        <linearGradient id={`${id}-gloss`} x1="50%" y1="0%" x2="50%" y2="55%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter id={`${id}-glow`} x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="1.1" stdDeviation="1.15" floodColor={metal.mid} floodOpacity="0.45" />
        </filter>
      </defs>
      <g filter={`url(#${id}-glow)`}>
        <path
          d={STAR_PATH}
          fill={`url(#${id}-metal)`}
          stroke={isUltimate ? "#B2DFDB" : "rgba(0,0,0,0.35)"}
          strokeWidth={isUltimate ? 1.5 : 1.2}
          strokeLinejoin="round"
        />
        <path
          d={STAR_PATH}
          fill={`url(#${id}-gloss)`}
          style={{ pointerEvents: "none" }}
        />
      </g>
    </svg>
  )
}
