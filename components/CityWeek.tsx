import { bangaloreWeek, event } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

export function CityWeek() {
  return (
    <section
      id="bangalore"
      className="relative py-24 md:py-32 section-pad border-b border-border"
    >
      <div className="container-page">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <p className="eyebrow !mb-0">City week</p>
          <span className="font-mono-meta text-[0.6rem] tracking-[0.16em] uppercase text-accent border border-accent/40 px-2 py-1">
            {bangaloreWeek.status}
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-display font-extrabold text-[clamp(2.25rem,5.5vw,4.25rem)] leading-[0.95] tracking-tight text-balance">
                {bangaloreWeek.title}
              </h2>
              <p className="mt-5 font-mono-meta text-sm sm:text-base tracking-[0.12em] uppercase text-accent">
                {bangaloreWeek.dates}
              </p>
              <p className="mt-3 text-muted text-sm">{bangaloreWeek.venue}</p>
              <p className="mt-6 text-lg text-foreground/90 leading-relaxed max-w-2xl">
                {bangaloreWeek.summary}
              </p>
            </Reveal>

            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {bangaloreWeek.highlights.map((item, i) => (
                <Reveal
                  key={item.title}
                  delay={i * 0.05}
                  className="border border-border p-5 hover:border-accent-border hover:bg-accent-soft/30 transition-colors"
                >
                  <h3 className="font-display text-lg font-bold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    {item.description}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-8">
              <a href={event.registerUrl} className="btn-primary">
                Register for Bangalore
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="border border-accent/30 bg-elevated/50 p-6 sm:p-8">
              <p className="font-mono-meta text-[0.65rem] tracking-[0.18em] uppercase text-dim mb-6">
                At a glance
              </p>
              <ul className="grid grid-cols-2 gap-4">
                {bangaloreWeek.stats.map((stat) => (
                  <li
                    key={stat.label}
                    className="border border-border bg-background p-4"
                  >
                    <p className="font-display text-2xl sm:text-3xl font-bold text-accent tracking-tight">
                      {stat.value}
                    </p>
                    <p className="mt-2 font-mono-meta text-[0.65rem] tracking-[0.14em] uppercase text-muted">
                      {stat.label}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted leading-relaxed">
                Inspired by the city-week model of ecosystem gatherings worldwide —
                decentralized events, one concentrated week, one city.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
