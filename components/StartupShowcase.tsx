import { event, startups } from "@/lib/data";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";

export function StartupShowcase() {
  return (
    <section
      id="showcase"
      className="relative py-24 md:py-32 section-pad border-b border-border"
    >
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <SectionHeading
            eyebrow="Showcase"
            title="What India is building."
            description="Discover companies — not booth wallpaper. Startup profiles will appear as the showcase cohort is selected."
          />
          <a href={event.showcaseUrl} className="btn-primary self-start">
            Apply to Showcase
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {startups.map((startup, i) => (
            <Reveal
              key={startup.id}
              delay={i * 0.05}
              className="group border border-border bg-background p-6 hover:border-accent-border transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className="size-12 border border-border bg-soft flex items-center justify-center font-mono-meta text-[0.6rem] text-dim tracking-wider"
                  aria-hidden
                >
                  LOGO
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold tracking-tight group-hover:text-accent transition-colors">
                    {startup.name}
                  </h3>
                  <p className="font-mono-meta text-[0.6rem] tracking-[0.14em] uppercase text-dim">
                    {startup.location}
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm text-muted leading-relaxed">
                {startup.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="font-mono-meta text-[0.6rem] tracking-[0.12em] uppercase border border-border px-2 py-1 text-muted">
                  {startup.sector}
                </span>
                <span className="font-mono-meta text-[0.6rem] tracking-[0.12em] uppercase border border-border px-2 py-1 text-muted">
                  {startup.stage}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
