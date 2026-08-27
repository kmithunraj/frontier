import { manifesto } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

export function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative py-24 md:py-32 section-pad border-b border-border"
    >
      <div className="container-page">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow mb-6">The Manifesto</p>
            <h2 className="font-display font-extrabold text-[clamp(2.25rem,6vw,4.75rem)] leading-[0.95] tracking-tight text-balance">
              {manifesto.headline}
            </h2>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-5 lg:pt-14">
            <p className="text-lg sm:text-xl text-foreground/90 leading-relaxed text-pretty">
              {manifesto.lead}
            </p>
            <p className="mt-6 text-base text-muted leading-relaxed text-pretty">
              {manifesto.body}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.18} className="mt-16 md:mt-20">
          <p className="font-mono-meta text-[0.65rem] tracking-[0.18em] uppercase text-dim mb-6">
            Designed around
          </p>
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border">
            {manifesto.pillars.map((pillar) => (
              <li
                key={pillar}
                className="bg-background px-4 py-6 md:py-8 group hover:bg-soft transition-colors"
              >
                <span className="block w-6 h-px bg-accent mb-4 group-hover:w-10 transition-all" />
                <span className="font-display text-sm sm:text-base font-semibold tracking-tight">
                  {pillar}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
