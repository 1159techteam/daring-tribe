import { getCadreStarColor } from "@/lib/learn/levels"

type Props = {
  slug: string
  size?: number
  className?: string
  title?: string
}

/**
 * 2go-style rank star — punchy fill, soft bevel highlight, strong rim.
 * Color is keyed by cadre slug (grey → green → … → black+gold for Ultimate).
 */
export function CadreStar({ slug, size = 22, className = "", title }: Props) {
  const fill = getCadreStarColor(slug)
  const isUltimate = slug === "ultimate"
  const id = `cadre-star-${slug}-${size}`

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
        <linearGradient id={`${id}-shine`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.18" />
        </linearGradient>
        <filter id={`${id}-glow`} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.2" floodColor={fill} floodOpacity="0.45" />
        </filter>
      </defs>
      <g filter={`url(#${id}-glow)`}>
        <path
          d="M16 2.2l3.55 7.2 7.95 1.16-5.75 5.6 1.36 7.92L16 20.4l-7.11 3.68 1.36-7.92-5.75-5.6 7.95-1.16L16 2.2z"
          fill={fill}
          stroke={isUltimate ? "#D4AF37" : "rgba(0,0,0,0.28)"}
          strokeWidth={isUltimate ? 1.8 : 1.15}
          strokeLinejoin="round"
        />
        <path
          d="M16 2.2l3.55 7.2 7.95 1.16-5.75 5.6 1.36 7.92L16 20.4l-7.11 3.68 1.36-7.92-5.75-5.6 7.95-1.16L16 2.2z"
          fill={`url(#${id}-shine)`}
          style={{ pointerEvents: "none" }}
        />
      </g>
    </svg>
  )
}
