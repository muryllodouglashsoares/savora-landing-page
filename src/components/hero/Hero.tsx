import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useCallback, useRef } from "react";
import { ArrowDown, UtensilsCrossed, CalendarCheck } from "lucide-react";

import dish from "@/assets/hero-dish.webp";
import basil from "@/assets/ing-basil.webp";
import tomato from "@/assets/ing-tomato.webp";
import rosemary from "@/assets/ing-rosemary.webp";
import parmesan from "@/assets/ing-parmesan.webp";
import oil from "@/assets/ing-oil.webp";
import pepper from "@/assets/ing-pepper.webp";
import garlic from "@/assets/ing-garlic.webp";

import { FloatingIngredient, type Ingredient } from "./FloatingIngredient";
import { Particles, Steam } from "./Atmosphere";
import { MagneticLink } from "@/components/common/MagneticLink";
import { EASE, SPRING, usePrefersReducedMotion } from "@/lib/motion";

/**
 * The Hero reads as one dish being plated, not a pile of images fading in.
 * `stage` is the beat in that sequence — dust first, then leaves, herbs,
 * oil, cheese, the heavier pieces — each stage a little further along the
 * chef's pass over the plate. STAGE_GAP is the pause between beats.
 */
const STAGE_GAP = 0.16;
const STAGE_START = 0.25;

const stageDelay = (stage: number, jitter = 0) => STAGE_START + stage * STAGE_GAP + jitter;

/**
 * Asymmetric, layered scatter: nothing orbits the plate.
 * Some pieces sit far behind it, others crash past the lens edge.
 */
const INGREDIENTS: Ingredient[] = [
  // stage 0 — dust settles, first leaves appear, deep background
  {
    src: basil,
    alt: "Folha de manjericão",
    x: 12,
    y: 14,
    size: 90,
    depth: 0.1,
    rotate: -18,
    blur: 3,
    opacity: 0.5,
    duration: 11,
    z: 1,
    delay: stageDelay(0),
  },
  {
    src: pepper,
    alt: "Grãos de pimenta",
    x: 78,
    y: 10,
    size: 110,
    depth: 0.15,
    rotate: 22,
    blur: 4,
    opacity: 0.45,
    duration: 13,
    z: 1,
    delay: stageDelay(0, 0.08),
  },

  // stage 1 — herbs land
  {
    src: rosemary,
    alt: "Ramo de alecrim",
    x: 64,
    y: 62,
    size: 120,
    depth: 0.12,
    rotate: 40,
    blur: 3.5,
    opacity: 0.4,
    duration: 12,
    z: 1,
    delay: stageDelay(1),
    hideOnMobile: true,
  },
  {
    src: basil,
    alt: "Manjericão fresco",
    x: 74,
    y: 46,
    size: 130,
    depth: 0.5,
    rotate: 28,
    duration: 7.5,
    z: 14,
    delay: stageDelay(1, 0.06),
  },

  // stage 2 — oil drizzles in
  {
    src: oil,
    alt: "Gota de azeite",
    x: 45,
    y: 8,
    size: 140,
    depth: 0.55,
    rotate: 8,
    opacity: 0.85,
    duration: 6.5,
    z: 14,
    delay: stageDelay(2),
  },

  // stage 3 — parmesan shaves down
  {
    src: parmesan,
    alt: "Lascas de parmesão",
    x: 60,
    y: 20,
    size: 200,
    depth: 0.38,
    rotate: 14,
    opacity: 0.9,
    duration: 9.5,
    z: 12,
    delay: stageDelay(3),
  },
  {
    src: parmesan,
    alt: "Parmesão em primeiro plano",
    x: 30,
    y: 86,
    size: 260,
    depth: 0.88,
    rotate: -8,
    blur: 7,
    opacity: 0.55,
    duration: 10.5,
    z: 40,
    delay: stageDelay(3, 0.1),
  },

  // stage 4 — tomato and aromatics land last, closest to camera
  {
    src: tomato,
    alt: "Tomate cortado em suspensão",
    x: 20,
    y: 52,
    size: 170,
    depth: 0.42,
    rotate: -12,
    duration: 8,
    z: 12,
    delay: stageDelay(4),
  },
  {
    src: garlic,
    alt: "Alho e pimenta",
    x: 8,
    y: 72,
    size: 150,
    depth: 0.45,
    rotate: -24,
    duration: 10,
    z: 12,
    delay: stageDelay(4, 0.08),
    hideOnMobile: true,
  },
  {
    src: rosemary,
    alt: "Alecrim em primeiro plano",
    x: -8,
    y: 24,
    size: 320,
    depth: 0.92,
    rotate: -34,
    blur: 5,
    opacity: 0.75,
    duration: 9,
    z: 40,
    delay: stageDelay(4, 0.14),
    hideOnMobile: true,
  },
  {
    src: tomato,
    alt: "Tomate em primeiro plano",
    x: 84,
    y: 74,
    size: 300,
    depth: 0.95,
    rotate: 18,
    blur: 6,
    opacity: 0.7,
    duration: 8.5,
    z: 40,
    delay: stageDelay(4, 0.2),
    hideOnMobile: true,
  },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const reduceMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const dishY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const dishScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const dishTiltX = useSpring(useTransform(pointerY, [-1, 1], [6, -6]), SPRING.heavy);
  const dishTiltY = useSpring(useTransform(pointerX, [-1, 1], [-8, 8]), SPRING.heavy);

  const handlePointer = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      pointerX.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
      pointerY.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
    },
    [pointerX, pointerY],
  );

  const resetPointer = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  // The moment the plate "receives light" — after every ingredient has
  // landed, the ember glow blooms once before settling into its ambient
  // breathing loop.
  const lightArrival = stageDelay(5);

  return (
    <section
      ref={ref}
      id="hero"
      onPointerMove={handlePointer}
      onPointerLeave={resetPointer}
      className="grain-overlay relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20"
    >
      {/* cinematic lighting */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "var(--gradient-ember)" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[140px]"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, delay: lightArrival, ease: EASE.organic }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-background to-transparent"
      />

      <Particles />
      <Steam />

      {INGREDIENTS.map((ing, i) => (
        <FloatingIngredient
          key={`${ing.alt}-${i}`}
          ingredient={ing}
          index={i}
          pointerX={pointerX}
          pointerY={pointerY}
          scrollY={scrollYProgress}
        />
      ))}

      <div className="relative z-20 mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.05fr_1fr]">
        <motion.div style={{ y: copyY, opacity: copyOpacity }}>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            Jardins · São Paulo
          </motion.p>

          <motion.h1
            className="mt-6 text-[clamp(3rem,9vw,7rem)] leading-[0.92]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: EASE.luxe }}
          >
            O sabor
            <br />
            <span className="text-gradient-gold italic">suspenso</span>
            <br />
            no tempo
          </motion.h1>

          <motion.p
            className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Cozinha contemporânea de fogo e precisão. Cada prato do Savora nasce de ingredientes
            vivos, capturados no instante exato em que encontram o calor.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55 }}
          >
            <MagneticLink
              href="#reservas"
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium tracking-wide text-primary-foreground transition-[box-shadow,filter] duration-500 hover:shadow-[0_0_40px_-6px_var(--gold)] hover:brightness-110"
            >
              <CalendarCheck className="size-4 transition-transform duration-500 group-hover:-rotate-6" />
              Reservar mesa
            </MagneticLink>
            <MagneticLink
              href="#cardapio"
              className="group inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm tracking-wide transition-colors duration-500 hover:border-gold hover:bg-surface"
            >
              <UtensilsCrossed className="size-4 text-gold transition-transform duration-500 group-hover:rotate-12" />
              Ver cardápio
            </MagneticLink>
          </motion.div>

          <motion.dl
            className="mt-14 flex flex-wrap gap-10 border-t border-border pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {[
              { k: "12 anos", v: "de cozinha autoral" },
              { k: "220", v: "rótulos na adega" },
              { k: "4.9", v: "avaliação média" },
            ].map((stat) => (
              <div key={stat.k}>
                <dt className="font-display text-3xl text-gold">{stat.k}</dt>
                <dd className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {stat.v}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* the plate — permanent focal point, heaviest object in the scene */}
        <motion.div
          className="relative flex items-center justify-center [perspective:1200px]"
          style={{ y: dishY, scale: dishScale, zIndex: 25 }}
        >
          <motion.div
            aria-hidden="true"
            className="absolute h-[62%] w-[62%] rounded-full bg-ember/25 blur-[90px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              reduceMotion
                ? { opacity: 0.7, scale: 1 }
                : { opacity: [0.55, 0.9, 0.55], scale: [0.95, 1.06, 0.95] }
            }
            transition={
              reduceMotion
                ? { duration: 1, delay: lightArrival }
                : { duration: 7, repeat: Infinity, ease: "easeInOut", delay: lightArrival }
            }
          />
          <motion.img
            src={dish}
            alt="Tagliatelle ao tartufo finalizado pelo chef do Savora"
            width={1200}
            height={1200}
            fetchPriority="high"
            className="relative w-[min(100%,34rem)] drop-shadow-[0_60px_80px_rgba(0,0,0,0.75)]"
            style={{ rotateX: dishTiltX, rotateY: dishTiltY }}
            initial={{ opacity: 0, scale: 0.8, y: 60 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: reduceMotion ? 0 : [0, -12, 0],
            }}
            transition={{
              opacity: { duration: 1.6, ease: EASE.organic, ...SPRING.heavy },
              scale: { duration: 1.6, ...SPRING.heavy },
              y: reduceMotion
                ? { duration: 1.6, ease: EASE.organic }
                : { duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.6 },
            }}
          />
        </motion.div>
      </div>

      <motion.a
        href="#cardapio"
        aria-label="Rolar para o cardápio"
        className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 text-muted-foreground transition-colors hover:text-gold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: reduceMotion ? 0 : [0, 10, 0] }}
        transition={{ opacity: { delay: 1.4 }, y: { duration: 2.6, repeat: Infinity } }}
      >
        <ArrowDown className="size-5" />
      </motion.a>
    </section>
  );
}
