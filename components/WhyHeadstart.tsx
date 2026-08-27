import { headstartTimeline } from "@/lib/data";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";

export function WhyHeadstart() {
  return (
    <section
      id="why-headstart"
      className="relative py-24 md:py-32 section-pad border-b border-border"
    >
      <div className="container-page">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Why Headstart"
              title="Built by the community that built the community."
            />
            <Reveal delay={0.1} className="mt-8 space-y-5 text-muted leading-relaxed">
              <p>
                Headstart is one of India&apos;s longstanding startup communities —
                volunteer-driven, founder-first, and present across multiple cities.
              </p>
              <p>
                Over the years, Headstart has organised thousands of startup
                ecosystem events: meetups, gatherings, and moments that connect
                builders where they already are.
              </p>
              <p>
                Bangalore Slush&apos;D 2024 showed that a Slush-style, high-density
                experience can thrive in India. Frontier Tech Week is the next
                chapter — an ecosystem-wide convergence designed for the decade
                ahead.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:col-span-7">
            <ol className="relative border border-border bg-elevated/30 p-6 sm:p-8 md:p-10">
              {headstartTimeline.map((item, i) => (
                <li
                  key={`${item.year}-${item.label}`}
                  className="relative flex gap-5 sm:gap-8 pb-8 last:pb-0"
                >
                  {i < headstartTimeline.length - 1 ? (
                    <span
                      className="absolute left-[1.15rem] sm:left-[1.35rem] top-8 bottom-0 w-px bg-border"
                      aria-hidden
                    />
                  ) : null}
                  <span className="relative z-[1] shrink-0 size-9 sm:size-11 border border-accent/40 bg-accent-soft flex items-center justify-center font-mono-meta text-[0.55rem] sm:text-[0.6rem] tracking-tight text-accent">
                    {item.year}
                  </span>
                  <div className="pt-2">
                    <p className="font-display text-lg sm:text-xl font-semibold tracking-tight">
                      {item.label}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
