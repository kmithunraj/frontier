import Image from "next/image";
import { speakers } from "@/lib/data";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";

export function Speakers() {
  return (
    <section
      id="speakers"
      className="relative py-24 md:py-32 section-pad border-b border-border"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="From Bangalore Slush'D"
          title="People who showed up."
          description="Speakers from Bangalore Slush'D — the gathering that proved Headstart can bring this density to India. Frontier Tech Week speakers announcing soon."
          className="mb-12"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {speakers.map((speaker, i) => (
            <Reveal
              key={speaker.name}
              delay={i * 0.03}
              className="group border border-border bg-elevated/20 overflow-hidden"
            >
              <div className="relative aspect-[3/4] bg-soft overflow-hidden">
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <p className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 font-display text-sm sm:text-base font-bold tracking-tight">
                  {speaker.name}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 font-mono-meta text-[0.65rem] tracking-[0.14em] uppercase text-dim">
          Source:{" "}
          <a
            href="https://www.blrslushd.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            blrslushd.com
          </a>
        </p>
      </div>
    </section>
  );
}
