import { motion } from "motion/react";
import { useMemo } from "react";

import { range, seeded } from "@/lib/motion";

interface Props {
  count: number;
  /** Seconds before the burst starts. */
  delay: number;
  reduceMotion: boolean;
}

/**
 * A quick, finite sprinkle of seasoning settling over the dish — not an
 * ambient loop. Every particle fires once, fades out, and stays inert.
 * Only `transform` (x/y) and `opacity`; no blur.
 */
export function SeasoningParticles({ count, delay, reduceMotion }: Props) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const rand = seeded(i * 53 + 7);
      return {
        id: i,
        x: range(rand, 34, 66),
        y: range(rand, 18, 40),
        dx: range(rand, -16, 16),
        dy: range(rand, 22, 42),
        size: range(rand, 2, 4),
        stagger: range(rand, 0, 0.18),
      };
    });
  }, [count]);

  if (reduceMotion) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-30">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-gold"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0], x: p.dx, y: p.dy }}
          transition={{ duration: 0.6, delay: delay + p.stagger, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
