import Image from "next/image";
import { gallery } from "@/lib/data";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";

export function Gallery() {
  return (
    <section
      id="gallery"
      className="relative py-24 md:py-32 section-pad border-b border-border"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow={gallery.eyebrow}
          title={gallery.title}
          description={gallery.description}
          className="mb-12"
        />

        <Reveal className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border border border-border mb-10">
          {gallery.stats.map((stat) => (
            <div key={stat.label} className="bg-background p-4 sm:p-5 text-center">
              <p className="font-display text-2xl sm:text-3xl font-bold text-accent tracking-tight">
                {stat.value}
              </p>
              <p className="mt-1 font-mono-meta text-[0.6rem] tracking-[0.14em] uppercase text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {gallery.frames.map((frame, i) => (
            <Reveal
              key={frame.label}
              delay={i * 0.04}
              className={`group relative overflow-hidden border border-border min-h-[240px] sm:min-h-[280px] ${
                i === 0 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <Image
                src={frame.image}
                alt={`${frame.label} — Bangalore Slush'D`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-mono-meta text-[0.65rem] tracking-[0.16em] uppercase text-accent">
                  {frame.label}
                </p>
                <p className="mt-1 font-display text-xl font-bold tracking-tight">
                  {frame.caption}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <a
            href={gallery.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Visit Bangalore Slush&apos;D
          </a>
        </Reveal>
      </div>
    </section>
  );
}
