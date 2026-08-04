import { motion } from "motion/react";

import { SectionHeading } from "@/components/common/SectionHeading";
import { EASE } from "@/lib/motion";
import entrada from "@/assets/dish-entrada.jpg";
import massa from "@/assets/dish-massa.jpg";
import carne from "@/assets/dish-carne.jpg";
import peixe from "@/assets/dish-peixe.jpg";
import risoto from "@/assets/dish-risoto.jpg";
import sobremesa from "@/assets/dish-sobremesa.jpg";
import drink from "@/assets/dish-drink.jpg";
import interior from "@/assets/cta-interior.jpg";

const shots = [
  { src: interior, alt: "Salão do Savora ao anoitecer", span: "sm:col-span-2 sm:row-span-2" },
  { src: massa, alt: "Ravioli artesanal", span: "" },
  { src: carne, alt: "Corte maturado na brasa", span: "" },
  { src: entrada, alt: "Burrata com tomates confitados", span: "" },
  { src: drink, alt: "Drink autoral defumado", span: "sm:row-span-2" },
  { src: risoto, alt: "Risoto de açafrão", span: "" },
  { src: peixe, alt: "Robalo em beurre blanc", span: "" },
  { src: sobremesa, alt: "Sobremesa Ouro Negro", span: "" },
];

export function Gallery() {
  return (
    <section id="galeria" className="scroll-mt-24 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Galeria"
          title="A casa em quadros"
          description="Fragmentos de um serviço comum em uma terça-feira qualquer."
          variant="fluid"
        />

        <div className="mt-16 grid auto-rows-[13rem] grid-cols-2 gap-3 sm:grid-cols-4">
          {shots.map((shot, index) => (
            <motion.figure
              key={shot.alt}
              initial={{ opacity: 0, scale: 0.9, clipPath: "inset(12% round 8px)" }}
              whileInView={{ opacity: 1, scale: 1, clipPath: "inset(0% round 8px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: index * 0.06, ease: EASE.organic }}
              className={`group relative overflow-hidden rounded-lg ${shot.span}`}
            >
              <img
                src={shot.src}
                alt={shot.alt}
                loading="lazy"
                decoding="async"
                className="size-full object-cover grayscale-[35%] transition-all duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-background/50 opacity-100 transition-opacity duration-700 group-hover:opacity-0" />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-background to-transparent p-4 text-xs uppercase tracking-[0.2em] text-foreground opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
                {shot.alt}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
