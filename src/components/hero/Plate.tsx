import { motion } from "motion/react";

import { EASE } from "@/lib/motion";

interface Props {
  reduceMotion: boolean;
  delay: number;
}

/**
 * The ceramic plate the dish lands on. Pure CSS gradients + shadows (no
 * image asset), so it themes off the same tokens as everything else and
 * costs nothing to render. Sits in the DOM before the dish image, so it
 * naturally paints underneath it — no explicit z-index needed.
 */
export function Plate({ reduceMotion, delay }: Props) {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-[9%] rounded-full"
      style={{
        background:
          "radial-gradient(circle at 34% 26%, color-mix(in oklab, var(--surface-2) 88%, white 12%), var(--surface-2) 42%, color-mix(in oklab, var(--surface) 88%, black 12%) 100%)",
        boxShadow:
          "0 34px 60px -18px rgba(0,0,0,0.65), 0 4px 14px rgba(0,0,0,0.35), inset 0 2px 4px rgba(255,255,255,0.08), inset 0 -14px 26px rgba(0,0,0,0.4)",
      }}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.72 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={reduceMotion ? { duration: 0 } : { delay, duration: 0.75, ease: EASE.organic }}
    >
      {/* hairline gold rim, just inside the plate's outer edge */}
      <div
        className="absolute inset-[4%] rounded-full"
        style={{
          boxShadow: "inset 0 0 0 1px color-mix(in oklab, var(--gold) 45%, transparent)",
        }}
      />
      {/* the well — a soft inner shadow where the food actually sits */}
      <div
        className="absolute inset-[16%] rounded-full"
        style={{
          background: "radial-gradient(circle at 38% 30%, rgba(255,255,255,0.05), transparent 62%)",
          boxShadow: "inset 0 14px 22px rgba(0,0,0,0.5), inset 0 -6px 14px rgba(255,255,255,0.05)",
        }}
      />
    </motion.div>
  );
}
