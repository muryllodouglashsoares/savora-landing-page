import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useCallback, useRef } from "react";
import { ArrowDown, UtensilsCrossed, CalendarCheck } from "lucide-react";

import { PlateAnimation } from "./PlateAnimation";
import { MagneticLink } from "@/components/common/MagneticLink";
import { EASE, SPRING, usePrefersReducedMotion } from "@/lib/motion";

/** When the plating sequence has fully settled (dish + all pieces + shine). */
const SETTLE_TIME = 3.1;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const reduceMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Scroll parallax — driven entirely by motion values (no re-renders), and
  // only ever animates transform/opacity.
  const dishY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const dishScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  // Cursor tilt — small, transform-only, and only recomputed on pointer
  // move (not on a timer), so it costs nothing while the pointer is still.
  const dishTiltX = useSpring(useTransform(pointerY, [-1, 1], [4, -4]), SPRING.heavy);
  const dishTiltY = useSpring(useTransform(pointerX, [-1, 1], [-6, 6]), SPRING.heavy);

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

  return (
    <section
      ref={ref}
      id="hero"
      onPointerMove={handlePointer}
      onPointerLeave={resetPointer}
      className="grain-overlay relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20"
    >
      {/* cinematic lighting — a static gradient, no animation cost */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "var(--gradient-ember)" }}
      />
      {/* soft ambient glow behind the plate — fades in once, then stays put */}
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[110px]"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.4,
          delay: reduceMotion ? 0 : SETTLE_TIME - 0.6,
          ease: EASE.organic,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-background to-transparent"
      />

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

        {/* the plate — chef's-eye plating, once, then completely still */}
        <motion.div
          className="relative flex items-center justify-center"
          style={{ y: dishY, scale: dishScale, zIndex: 25 }}
        >
          <PlateAnimation reduceMotion={reduceMotion} dishTiltX={dishTiltX} dishTiltY={dishTiltY} />
        </motion.div>
      </div>

      <motion.a
        href="#cardapio"
        aria-label="Rolar para o cardápio"
        className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 text-muted-foreground transition-colors hover:text-gold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <ArrowDown className="size-5" />
      </motion.a>
    </section>
  );
}
