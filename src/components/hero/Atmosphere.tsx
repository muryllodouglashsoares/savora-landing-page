import { motion } from "motion/react";
import { useMemo } from "react";

import { range, seeded, usePrefersReducedMotion } from "@/lib/motion";

/** Fine suspended dust / spice particles that keep the scene alive. */
export function Particles({ count = 26 }: { count?: number }) {
  const reduceMotion = usePrefersReducedMotion();

  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const rand = seeded(i * 733 + 11);
        return {
          id: i,
          left: rand() * 100,
          top: rand() * 100,
          size: 1.5 + rand() * 3.5,
          duration: 9 + rand() * 12,
          delay: rand() * 8,
          drift: 20 + rand() * 60,
          opacity: 0.15 + rand() * 0.4,
          // A slight horizontal wobble on the way up, never the same twice.
          wobble: range(rand, -0.35, 0.35),
        };
      }),
    [count],
  );

  if (reduceMotion) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-gold-soft"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            filter: "blur(0.5px)",
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, p.opacity, p.opacity * 0.7, 0],
            y: [0, -p.drift * 0.6, -p.drift, -p.drift * 1.6],
            x: [0, p.drift * p.wobble, -p.drift * p.wobble * 0.6, p.drift * p.wobble * 0.3],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            times: [0, 0.35, 0.7, 1],
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/** Soft rising steam plumes behind the plate — alive, never on a fixed loop. */
export function Steam() {
  const reduceMotion = usePrefersReducedMotion();

  const plumes = useMemo(
    () =>
      [0, 1, 2, 3].map((i) => {
        const rand = seeded(i * 401 + 5);
        return {
          id: i,
          duration: 8 + i * 1.6 + rand() * 2,
          delay: i * 2.1 + rand() * 1.2,
          driftX: range(rand, -14, 14),
          peakScale: range(rand, 1.15, 1.4),
        };
      }),
    [],
  );

  if (reduceMotion) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[22%] flex justify-center gap-10"
      >
        {plumes.map((p) => (
          <div
            key={p.id}
            className="h-64 w-40 rounded-full bg-gold-soft/10 opacity-30"
            style={{ filter: "blur(42px)" }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-[22%] flex justify-center gap-10"
    >
      {plumes.map((p) => (
        <motion.div
          key={p.id}
          className="h-64 w-40 rounded-full bg-gold-soft/10"
          style={{ filter: "blur(42px)" }}
          initial={{ opacity: 0, y: 40, scaleX: 0.7, x: 0 }}
          animate={{
            opacity: [0, 0.5, 0.3, 0],
            y: [40, -60, -130, -190],
            x: [0, p.driftX * 0.4, p.driftX, p.driftX * 0.6],
            scaleX: [0.7, p.peakScale, p.peakScale * 1.05, 0.9],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            times: [0, 0.3, 0.65, 1],
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
