import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import interior from "@/assets/cta-interior.jpg";
import { MagneticLink } from "@/components/common/MagneticLink";
import { EASE, SPRING } from "@/lib/motion";

export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <motion.img
        src={interior}
        alt="Salão do Savora iluminado por velas"
        loading="lazy"
        decoding="async"
        width={1600}
        height={900}
        style={{ y }}
        className="absolute inset-0 size-full scale-125 object-cover"
      />
      <div className="absolute inset-0 bg-background/80" />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "var(--gradient-ember)" }}
      />

      <div className="relative mx-auto max-w-3xl px-6 py-40 text-center">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Reserve sua noite
        </motion.p>
        <motion.h2
          className="mt-6 text-[clamp(2.5rem,7vw,5rem)] leading-[1.02]"
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease: EASE.settle }}
        >
          A mesa está posta.
          <br />
          <span className="italic text-gradient-gold">Falta você.</span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.92 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ...SPRING.medium }}
        >
          <MagneticLink
            href="#reservas"
            strength={12}
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-gold px-9 py-4 text-sm font-medium tracking-wide text-primary-foreground transition-[box-shadow,filter] duration-500 hover:shadow-[0_0_50px_-8px_var(--gold)] hover:brightness-110"
          >
            Fazer uma reserva
            <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </MagneticLink>
        </motion.div>
      </div>
    </section>
  );
}
