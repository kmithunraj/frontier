import { event, matchmakingFeatures, matchmakingPairs } from "@/lib/data";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";

export function Matchmaking() {
  return (
    <section
      id="matchmaking"
      className="relative py-24 md:py-32 section-pad border-b border-border overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-30 pointer-events-none grid-bg"
        aria-hidden
      />
      <div className="container-page relative">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <p className="eyebrow !mb-0">Matchmaking</p>
          <span className="font-mono-meta text-[0.6rem] tracking-[0.16em] uppercase text-orange border border-orange/30 px-2 py-1">
            Planned · Coming Soon
          </span>
        </div>

        <SectionHeading
          title="Come for the event. Leave with the right connections."
          description="The value isn't just what happens on stage. It's who you meet between sessions."
          className="mb-14 max-w-3xl"
        />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <ul className="space-y-3">
              {matchmakingPairs.map((pair) => (
                <li
                  key={`${pair.from}-${pair.to}`}
                  className="flex items-center gap-3 sm:gap-4 border border-border bg-elevated/40 px-4 py-4"
                >
                  <span className="font-display font-semibold text-sm sm:text-base min-w-[5.5rem]">
                    {pair.from}
                  </span>
                  <span
                    className="flex-1 h-px bg-gradient-to-r from-accent/60 via-accent/20 to-blue/40 relative"
                    aria-hidden
                  >
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 size-1.5 rounded-full bg-accent" />
                  </span>
                  <span className="font-display font-semibold text-sm sm:text-base text-muted min-w-[5.5rem] text-right">
                    {pair.to}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {matchmakingFeatures.map((feature, i) => (
              <Reveal
                key={feature.title}
                delay={i * 0.05}
                className="border border-border p-5 sm:p-6 bg-background hover:bg-soft transition-colors"
              >
                <h3 className="font-display text-lg font-bold tracking-tight">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  {feature.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-10">
          <a href={event.matchmakingUrl} className="btn-primary">
            Get Matched
          </a>
        </Reveal>
      </div>
    </section>
  );
}
