const stats = [
  {
    value: "500+",
    label: "Tribe Members",
  },
  {
    value: "$2.5B+",
    label: "Sales Volume",
  },
  {
    value: "95%",
    label: "Success Rate",
  },
]

export function Stats() {
  return (
    <section className="relative py-12 sm:py-16 overflow-hidden bg-secondary">
      <div className="container px-4 relative z-10">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-4 sm:gap-6 grid-cols-3">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 sm:p-6 rounded-xl bg-card border-2 border-border hover:border-accent/50 transition-all"
              >
                <div className="mb-1 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-accent">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
