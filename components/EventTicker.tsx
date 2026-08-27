import { tickerItems } from "@/lib/data";

export function EventTicker() {
  const items = [...tickerItems, ...tickerItems];

  return (
    <section
      aria-label="Ecosystem themes"
      className="relative z-[2] border-y border-border bg-elevated/80 py-4 overflow-hidden"
    >
      <div className="marquee" aria-hidden>
        <div className="marquee-track">
          {items.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex items-center gap-6 font-display text-sm sm:text-base font-semibold tracking-[0.2em] text-muted"
            >
              {item}
              <span className="text-accent text-xs">◆</span>
            </span>
          ))}
        </div>
        <div className="marquee-track" aria-hidden>
          {items.map((item, i) => (
            <span
              key={`dup-${item}-${i}`}
              className="flex items-center gap-6 font-display text-sm sm:text-base font-semibold tracking-[0.2em] text-muted"
            >
              {item}
              <span className="text-accent text-xs">◆</span>
            </span>
          ))}
        </div>
      </div>
      <p className="sr-only">{tickerItems.join(", ")}</p>
    </section>
  );
}
