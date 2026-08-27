import { tracks } from "@/lib/data";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function Tracks() {
  return (
    <section
      id="tracks"
      className="relative py-24 md:py-32 section-pad border-b border-border"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="Themes"
          title="The conversations that matter."
          description="Proposed track categories — not confirmed. Edit freely as the programme crystallises."
          className="mb-14"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
          {tracks.map((track, i) => (
            <Reveal
              key={track.number}
              delay={(i % 6) * 0.04}
              className={cn(
                "group border border-border bg-elevated/20 p-6 sm:p-7 flex flex-col transition-all duration-300 hover:border-accent-border hover:-translate-y-1",
                i === 0 && "sm:col-span-2 lg:col-span-1 lg:row-span-1",
                i === 2 && "lg:mt-8",
                i === 5 && "lg:-mt-4",
                i === 8 && "lg:mt-6"
              )}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-mono-meta text-[0.7rem] tracking-[0.2em] text-accent">
                  {track.number}
                </span>
                <span className="h-px flex-1 bg-border group-hover:bg-accent/40 transition-colors mx-3" />
              </div>
              <h3 className="mt-5 font-display text-xl sm:text-2xl font-bold tracking-tight">
                {track.title}
              </h3>
              <p className="mt-3 text-sm text-muted leading-relaxed flex-1">
                {track.description}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {track.topics.map((topic) => (
                  <li
                    key={topic}
                    className="font-mono-meta text-[0.6rem] tracking-[0.12em] uppercase text-dim border border-border px-2 py-1"
                  >
                    {topic}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
