import { event, sideEvents } from "@/lib/data";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";

export function SideEvents() {
  return (
    <section
      id="side-events"
      className="relative py-24 md:py-32 section-pad border-b border-border"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="Beyond the venue"
          title="The city becomes part of the event."
          description="The official ecosystem extends past the main stage — dinners, salons, workshops and community energy across the city."
          className="mb-14"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {sideEvents.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 0.04}
              className="bg-background p-6 sm:p-7 hover:bg-soft transition-colors"
            >
              <span className="font-mono-meta text-[0.65rem] tracking-[0.18em] text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-xl font-bold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <a href={event.hostUrl} className="btn-secondary">
            Host a Side Event
          </a>
        </Reveal>
      </div>
    </section>
  );
}
