import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { MenuItem } from "@/data/menu";
import { SPRING, usePrefersReducedMotion } from "@/lib/motion";

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

export function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const reduceMotion = usePrefersReducedMotion();

  // A light 3D tilt toward the cursor, plus the image drifting opposite the
  // tilt for a subtle parallax — the card behaves like a held object, not a
  // flat sticker.
  const rotateX = useSpring(0, SPRING.medium);
  const rotateY = useSpring(0, SPRING.medium);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glow = useTransform(
    [glowX, glowY],
    ([gx, gy]) =>
      `radial-gradient(280px circle at ${gx}% ${gy}%, color-mix(in oklab, var(--gold) 16%, transparent), transparent 70%)`,
  );

  const handleMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(relX * 8);
    rotateX.set(-relY * 8);
    glowX.set((relX + 0.5) * 100);
    glowY.set((relY + 0.5) * 100);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 34, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.97 }}
      transition={{ duration: 0.6, delay: index * 0.06, ...SPRING.medium }}
      whileHover={reduceMotion ? { y: 0 } : { y: -8 }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="card-luxe group relative overflow-hidden rounded-xl hover:border-gold/50"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: glow }}
      />
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          decoding="async"
          width={800}
          height={600}
          className="size-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        {item.tag ? (
          <span className="absolute left-4 top-4 rounded-full border border-gold/40 bg-background/70 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-gold backdrop-blur">
            {item.tag}
          </span>
        ) : null}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl leading-tight">{item.name}</h3>
          <span className="shrink-0 font-display text-xl text-gold">
            {currency.format(item.price)}
          </span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {item.ingredients.map((ingredient) => (
            <li
              key={ingredient}
              className="rounded-full bg-surface-2 px-3 py-1 text-[0.7rem] text-muted-foreground transition-colors duration-500 group-hover:text-foreground"
            >
              {ingredient}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}
