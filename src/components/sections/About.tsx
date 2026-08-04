import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import chef from "@/assets/chef.jpg";
import { Reveal } from "@/components/common/Reveal";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="sobre" className="relative scroll-mt-24 border-y border-border py-28">
      <div ref={ref} className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-xl">
          <motion.img
            src={chef}
            alt="Chef executivo do Savora na cozinha"
            loading="lazy"
            decoding="async"
            width={900}
            height={900}
            style={{ y: imageY }}
            className="h-[32rem] w-full scale-110 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6">
            <p className="font-display text-2xl">Lorenzo Bianchi</p>
            <p className="text-xs uppercase tracking-[0.25em] text-gold">Chef executivo</p>
          </div>
        </div>

        <div>
          <Reveal variant="story">
            <p className="eyebrow">Nossa história</p>
            <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">
              Um restaurante nascido de uma <span className="italic text-gold">obsessão</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1} variant="story">
            <p className="mt-6 leading-relaxed text-muted-foreground">
              O Savora começou em 2013 como uma cozinha de doze lugares. A regra era simples: nenhum
              ingrediente entra sem que o chef conheça quem o produziu. Doze anos depois, a regra
              permanece — e a lista de produtores é a nossa maior receita.
            </p>
          </Reveal>

          <Reveal delay={0.2} variant="story">
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Nossa missão é transformar técnica em emoção. Cada serviço é ensaiado como uma cena: o
              tempo do fogo, a temperatura do prato, a luz sobre a mesa.
            </p>
          </Reveal>

          <Reveal delay={0.3} variant="story">
            <div className="mt-10 grid gap-6 border-t border-border pt-8 sm:grid-cols-3">
              {[
                { k: "2013", v: "Fundação" },
                { k: "38", v: "Produtores parceiros" },
                { k: "3", v: "Menus degustação" },
              ].map((stat) => (
                <div key={stat.k}>
                  <p className="font-display text-3xl text-gold">{stat.k}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {stat.v}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
