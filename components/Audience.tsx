import { audiences } from "@/lib/data";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";

const accents = [
  "border-l-accent",
  "border-l-blue",
  "border-l-orange",
  "border-l-accent",
  "border-l-blue",
  "border-l-orange",
];

export function Audience() {
  return (
    <section
      id="audience"
      className="relative py-24 md:py-32 section-pad border-b border-border"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="Who is this for"
          title="Who will you meet?"
          description="One room. The full stack of India's startup ecosystem."
          className="mb-14"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {audiences.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 0.05}
              className={`bg-background p-7 sm:p-8 border-l-2 ${accents[i]} hover:bg-soft transition-colors`}
            >
              <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-4 text-sm text-muted leading-relaxed">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
