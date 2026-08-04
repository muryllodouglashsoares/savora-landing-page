import { motion } from "motion/react";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";

import { SectionHeading } from "@/components/common/SectionHeading";
import { MagneticLink } from "@/components/common/MagneticLink";
import { site } from "@/data/site";

/**
 * Placeholder de mapa. O container abaixo está preparado para receber
 * a integração da Google Maps API sem alterar o layout.
 */
export function Location() {
  return (
    <section id="localizacao" className="scroll-mt-24 border-y border-border bg-surface/30 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Localização"
          title="Onde nos encontrar"
          description="No coração dos Jardins, a três minutos a pé da Alameda Lorena."
          variant="refined"
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.15fr]">
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
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`}
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
            className="relative grid min-h-[24rem] place-items-center overflow-hidden rounded-xl border border-border bg-background/60"
            aria-label="Mapa da localização do restaurante"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 size-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl"
            />
            <div className="relative text-center">
              <motion.span
                className="mx-auto grid size-14 place-items-center rounded-full border border-gold/40 text-gold"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <MapPin className="size-6" />
              </motion.span>
              <p className="mt-5 font-display text-2xl">Savora Cucina</p>
              <p className="mt-1 text-sm text-muted-foreground">{site.address}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
