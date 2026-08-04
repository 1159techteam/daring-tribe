import { cn } from "@/lib/utils"

type SpinnerProps = {
  className?: string
  size?: "sm" | "md" | "lg"
  label?: string
}

const sizeClass = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-[3px]",
}

/**
 * Reusable loading spinner: Buddy-style ring (gold accent on Tribe cream/brown).
 */
export function Spinner({ className, size = "md", label }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-live="polite"
      aria-label={label || "Loading"}
      className={cn("inline-flex items-center justify-center gap-2", className)}
    >
      <span
        className={cn(
          "animate-spin rounded-full border-[#3E2C1C]/15 border-t-[#D4AF37]",
          sizeClass[size]
        )}
      />
      {label ? <span className="text-sm text-[#6D5D56]">{label}</span> : null}
      <span className="sr-only">{label || "Loading"}</span>
    </span>
  )
}
