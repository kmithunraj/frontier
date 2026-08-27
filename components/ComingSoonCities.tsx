import { comingSoonCities } from "@/lib/data";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";

export function ComingSoonCities() {
  return (
    <section
      id="cities"
      className="relative py-24 md:py-28 section-pad border-b border-border"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="Next cities"
          title="Coming soon to your city."
          description="Frontier Tech Week starts in Bangalore — then expands across India."
          className="mb-12"
        />

        <div className="grid sm:grid-cols-3 gap-4">
          {comingSoonCities.map((city, i) => (
            <Reveal
              key={city.city}
              delay={i * 0.06}
              className="group relative border border-border bg-elevated/30 p-6 sm:p-8 min-h-[200px] flex flex-col justify-between overflow-hidden hover:border-accent-border transition-colors"
            >
              <div
                className="absolute -right-8 -top-8 size-28 rounded-full bg-accent/10 blur-2xl group-hover:bg-accent/20 transition-colors"
                aria-hidden
              />
              <div>
                <span className="font-mono-meta text-[0.65rem] tracking-[0.18em] uppercase text-accent">
                  {city.status}
                </span>
                <h3 className="mt-4 font-display text-3xl sm:text-4xl font-bold tracking-tight">
                  {city.city}
                </h3>
              </div>
              <p className="mt-6 text-sm text-muted">{city.note}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
