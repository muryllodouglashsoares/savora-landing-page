import { motion, type Easing, type TargetAndTransition } from "motion/react";
import type { ReactNode } from "react";

import { EASE } from "@/lib/motion";

/**
 * Each section gets its own reveal personality instead of one fade-up
 * reused everywhere:
 *  - cinematic  → Hero-adjacent: soft blur lifts as it settles.
 *  - story      → About: gentle diagonal drift, like turning a page.
 *  - fluid      → Gallery: mask wipe, image resolving into view.
 *  - refined    → Reservation/Location: quiet, precise, minimal travel.
 *  - discrete   → FAQ: barely-there fade, doesn't compete with content.
 *  - impactful  → Final CTA: confident scale-in with a touch of overshoot.
 */
export type RevealVariant = "cinematic" | "story" | "fluid" | "refined" | "discrete" | "impactful";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  variant?: RevealVariant;
}

const VARIANTS: Record<
  RevealVariant,
  {
    initial: TargetAndTransition;
    animate: TargetAndTransition;
    duration: number;
    ease: Easing;
  }
> = {
  cinematic: {
    initial: { opacity: 0, y: 28, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    duration: 1.1,
    ease: EASE.organic as unknown as Easing,
  },
  story: {
    initial: { opacity: 0, x: -24, y: 16 },
    animate: { opacity: 1, x: 0, y: 0 },
    duration: 0.95,
    ease: EASE.luxe as unknown as Easing,
  },
  fluid: {
    initial: { opacity: 0, scale: 0.94, clipPath: "inset(8% 8% 8% 8% round 12px)" },
    animate: { opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0% round 12px)" },
    duration: 1,
    ease: EASE.organic as unknown as Easing,
  },
  refined: {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    duration: 0.7,
    ease: EASE.crisp as unknown as Easing,
  },
  discrete: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    duration: 0.6,
    ease: EASE.crisp as unknown as Easing,
  },
  impactful: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    duration: 0.9,
    ease: EASE.settle as unknown as Easing,
  },
};

export function Reveal({ children, delay = 0, y, variant = "cinematic", className }: RevealProps) {
  const v = VARIANTS[variant];
  const initial: TargetAndTransition = y !== undefined ? { ...v.initial, y } : v.initial;

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={v.animate}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: v.duration, delay, ease: v.ease }}
    >
      {children}
    </motion.div>
  );
}
