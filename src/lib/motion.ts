/**
 * Shared motion system for Savora.
 *
 * Everything here exists so animation feels like it was choreographed once,
 * on purpose, rather than sprinkled per-component. Three ideas run through
 * all of it:
 *
 * 1. Weight — entrances use springs (mass/stiffness/damping), not fixed
 *    durations, so heavier elements settle slower and lighter ones snap.
 * 2. Desync — anything that loops forever uses a seeded per-instance value
 *    so no two elements share a phase, period, or amplitude.
 * 3. Restraint — every looping animation is gated by `prefersReducedMotion`.
 */

import { useRef } from "react";
import { useMotionValue, useReducedMotion, useSpring } from "motion/react";

/** Cinematic easing curves. Use the one that matches the story, not the default. */
export const EASE = {
  /** Standard premium ease — decisive start, soft landing. */
  luxe: [0.22, 1, 0.36, 1],
  /** Slower to start, more suspended — for large/heavy elements (the plate). */
  organic: [0.16, 1, 0.3, 1],
  /** Gentle overshoot — for things that should feel like they have mass and settle. */
  settle: [0.34, 1.56, 0.64, 1],
  /** Fast out, no lingering — for UI feedback (buttons, small chrome). */
  crisp: [0.4, 0, 0.2, 1],
} as const;

/** Spring presets standing in for "how heavy does this feel". */
export const SPRING = {
  /** Small chrome: buttons, icons, cursor-following highlights. */
  light: { stiffness: 300, damping: 22, mass: 0.5 },
  /** Cards, nav, mid-weight UI. */
  medium: { stiffness: 170, damping: 24, mass: 0.9 },
  /** Plated dish, large imagery — slow to start, slow to stop. */
  heavy: { stiffness: 90, damping: 18, mass: 1.6 },
  /** Floating ingredients settling into place — a touch of overshoot. */
  landing: { stiffness: 120, damping: 14, mass: 1.1 },
} as const;

/**
 * Deterministic pseudo-random generator (mulberry32). Same seed always
 * produces the same sequence, so server and client render identically and
 * nothing pops or reflows on hydration — but every instance that gets a
 * different seed drifts out of phase with every other instance.
 */
export function seeded(seed: number) {
  let t = seed + 0x6d2b79f5;
  return function next() {
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

/** Maps a seeded 0–1 draw into [min, max]. */
export function range(rand: () => number, min: number, max: number) {
  return min + rand() * (max - min);
}

/**
 * Builds a set of "never quite repeats" loop periods from one base duration.
 * Using irrational-ish ratios (not small integer multiples) keeps x/y/rotate
 * from ever lining back up into a visible cycle.
 */
export function driftPeriods(base: number, rand: () => number) {
  return {
    y: base * range(rand, 0.92, 1.08),
    x: base * range(rand, 1.35, 1.65),
    rotate: base * range(rand, 1.55, 1.95),
    tumble: base * range(rand, 2.1, 2.6),
  };
}

/** Wraps `useReducedMotion`, defaulting to `false` while the preference is unknown. */
export function usePrefersReducedMotion() {
  return useReducedMotion() ?? false;
}

/**
 * A restrained "magnetic" hover: the element leans a few px toward the
 * pointer and springs back on release. This is the physical weight cue for
 * buttons — real objects resist being pushed, then settle.
 */
export function useMagnetic<T extends HTMLElement>(strength = 14) {
  const ref = useRef<T>(null);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING.light);
  const springY = useSpring(y, SPRING.light);

  const onPointerMove = (event: React.PointerEvent) => {
    if (reduceMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, style: { x: springX, y: springY }, onPointerMove, onPointerLeave };
}
