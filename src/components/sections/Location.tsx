import { motion } from "motion/react";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";

import { SectionHeading } from "@/components/common/SectionHeading";
import { MagneticLink } from "@/components/common/MagneticLink";
import { site } from "@/data/site";

const mapsEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.address)}&output=embed`;
const mapsSearchHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`;

export function Location() {
  return (
    <section id="localizacao" className="scroll-mt-24 border-y border-border bg-surface/30 py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Localização"
          title="Onde nos encontrar"
          description="No coração dos Jardins, a três minutos a pé da Alameda Lorena."
          variant="refined"
        />

        <div className="mt-10 grid gap-8 sm:mt-14 lg:mt-16 lg:grid-cols-[1fr_1.15fr]">
          <div className="space-y-4">
            {[
              { icon: MapPin, label: "Endereço", value: site.address },
              { icon: Phone, label: "Telefone", value: site.phone },
              {
                icon: Clock,
                label: "Horários",
                value: site.hours.map((h) => `${h.day}: ${h.time}`).join(" · "),
              },
            ].map(({ icon: Icon, label, value }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="card-luxe flex gap-4 rounded-xl p-6 hover:border-gold/50"
              >
                <Icon className="mt-0.5 size-5 shrink-0 text-gold" />
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {label}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed">{value}</p>
                </div>
              </motion.div>
            ))}

            <MagneticLink
              href={mapsSearchHref}
              target="_blank"
              rel="noreferrer"
              strength={8}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/60 px-7 py-3.5 text-sm text-gold transition-colors duration-500 hover:bg-gold hover:text-primary-foreground"
            >
              <Navigation className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
              Como chegar
            </MagneticLink>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-[24rem] overflow-hidden rounded-xl border border-border bg-background/60"
          >
            <iframe
              title={`Mapa de localização — ${site.address}`}
              src={mapsEmbedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 h-full w-full grayscale-[10%]"
              style={{ filter: "invert(94%) hue-rotate(180deg) contrast(0.92) brightness(0.95)" }}
            />

            {/* soft vignette so the bright map blends into the dark theme */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 shadow-[inset_0_0_70px_28px_var(--background)] opacity-70"
            />

            <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-3 rounded-lg border border-gold/30 bg-background/85 px-4 py-2.5 backdrop-blur-sm">
              <MapPin className="size-4 shrink-0 text-gold" />
              <div>
                <p className="font-display text-sm leading-tight">Savora Cucina</p>
                <p className="text-xs text-muted-foreground">{site.address}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
