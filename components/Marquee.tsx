const items = [
  '$300 FLAT BUILD FEE',
  'YOU OWN THE CODE',
  'NO EXIT FEES',
  '5–7 DAYS TO LAUNCH',
  'CALGARY, AB',
  'NO LOCK-IN',
  'SEO FROM DAY ONE',
  'MOBILE FIRST',
]

const repeated = [...items, ...items]

export default function Marquee() {
  return (
    <div className="overflow-hidden border-y border-rim/40 bg-surface/30 py-4 select-none">
      <div className="animate-marquee flex whitespace-nowrap">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="mx-8 inline-flex items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-smoke"
          >
            {item}
            <span className="h-1 w-1 shrink-0 rounded-full bg-ember/50" />
          </span>
        ))}
      </div>
    </div>
  )
}
