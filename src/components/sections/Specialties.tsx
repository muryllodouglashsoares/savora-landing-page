import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Flame, Wheat, Fish, Wine } from "lucide-react";

import { SectionHeading } from "@/components/common/SectionHeading";
import { specialties } from "@/data/site";
import { EASE, SPRING, usePrefersReducedMotion } from "@/lib/motion";

const icons = { Flame, Wheat, Fish, Wine } as const;

function SpecialtyCard({ item, index }: { item: (typeof specialties)[number]; index: number }) {
  const reduceMotion = usePrefersReducedMotion();
  const Icon = icons[item.icon as keyof typeof icons];

  const rotateX = useSpring(0, SPRING.medium);
  const rotateY = useSpring(0, SPRING.medium);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glow = useTransform(
    [glowX, glowY],
    ([gx, gy]) =>
      `radial-gradient(220px circle at ${gx}% ${gy}%, color-mix(in oklab, var(--gold) 18%, transparent), transparent 70%)`,
  );

  const handleMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(relX * 7);
    rotateX.set(-relY * 7);
    glowX.set((relX + 0.5) * 100);
    glowY.set((relY + 0.5) * 100);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: EASE.luxe }}
      whileHover={reduceMotion ? { y: 0 } : { y: -10 }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="card-luxe group relative overflow-hidden rounded-xl p-8 hover:border-gold/50"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: glow }}
      />
      <Icon className="relative size-7 text-gold transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-6" />
      <h3 className="relative mt-6 text-2xl">{item.title}</h3>
      <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
        {item.description}
      </p>
    </motion.article>
  );
}

export function Specialties() {
  return (
    <section id="especialidades" className="scroll-mt-24 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Especialidades"
          title="O que define a casa"
          description="Quatro pilares que atravessam todo o menu, do primeiro couvert ao último café."
          variant="refined"
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {specialties.map((item, index) => (
            <SpecialtyCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
