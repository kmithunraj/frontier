import Image from "next/image";
import { event, partners } from "@/lib/data";
import { Reveal, SectionHeading } from "@/components/ui/Reveal";

export function Partners() {
  return (
    <section
      id="partners"
      className="relative py-24 md:py-32 section-pad border-b border-border"
    >
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <SectionHeading
            eyebrow="Partners"
            title="Built with the ecosystem."
            description="Partners and sponsors from Bangalore Slush'D. Frontier Tech Week partnership opportunities opening soon."
          />
          <a href={event.partnerUrl} className="btn-primary self-start shrink-0">
            Become a Partner
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {partners.map((partner, i) => (
            <Reveal
              key={partner.name}
              delay={i * 0.02}
              className="border border-border bg-elevated/30 aspect-[2.2/1] flex items-center justify-center p-4 sm:p-6 hover:border-accent-border transition-colors"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={160}
                height={80}
                className="max-h-12 w-auto object-contain opacity-90"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
