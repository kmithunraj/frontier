import { getInvolved } from "@/lib/data";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";
import { ArrowUpRight } from "lucide-react";

export function GetInvolved() {
  return (
    <section
      id="get-involved"
      className="relative py-24 md:py-32 section-pad border-b border-border"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="Participate"
          title="There's more than one way in."
          description="Attend, showcase, invest, partner, host or volunteer — pick the path that fits how you show up in the ecosystem."
          className="mb-14"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {getInvolved.map((path, i) => (
            <Reveal
              key={path.id}
              delay={i * 0.05}
              className="group relative border border-border bg-elevated/25 p-6 sm:p-7 flex flex-col min-h-[220px] hover:border-accent-border hover:bg-accent-soft/30 transition-all"
            >
              <span className="font-mono-meta text-[0.65rem] tracking-[0.18em] text-dim">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold tracking-tight">
                {path.title}
              </h3>
              <p className="mt-3 text-sm text-muted leading-relaxed flex-1">
                {path.description}
              </p>
              <a
                href={path.href}
                className="mt-6 inline-flex items-center gap-2 font-mono-meta text-[0.7rem] tracking-[0.14em] uppercase text-accent group-hover:gap-3 transition-all min-h-11"
              >
                {path.cta}
                <ArrowUpRight size={14} aria-hidden />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
