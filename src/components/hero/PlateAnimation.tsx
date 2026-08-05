import { motion, type MotionValue } from "motion/react";
import { useMemo, useState } from "react";

import dish from "@/assets/hero-dish.webp";
import basil from "@/assets/ing-basil.webp";
import garlic from "@/assets/ing-garlic.webp";
import tomato from "@/assets/ing-tomato.webp";
import rosemary from "@/assets/ing-rosemary.webp";
import oil from "@/assets/ing-oil.webp";
import parmesan from "@/assets/ing-parmesan.webp";
import pepper from "@/assets/ing-pepper.webp";

import { Ingredient, type IngredientPiece } from "./Ingredient";
import { ShineEffect } from "./ShineEffect";
import { SeasoningParticles } from "./SeasoningParticles";
import { EASE } from "@/lib/motion";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * The plating sequence, timed to the reference the brief gave us
 * (~0.2s dish → ~2.8s shine → ~3.0s done). Desktop/tablet get the full
 * nine-beat pass; mobile gets a shorter, lighter version with fewer
 * individual pieces (grouped) and a tighter timeline.
 *
 * Note on ingredients: the project ships real cutouts for basil, garlic,
 * tomato, rosemary, olive oil, parmesan and pepper — no isolated salmon or
 * asparagus asset exists (and this build has no image-generation tool), so
 * the "protein" beat is represented by the dish photo itself (a plated
 * tagliatelle al tartufo) landing first, with the other real ingredients
 * garnishing it afterward in the same spirit as the brief's sequence.
 */
const DESKTOP_PIECES: Omit<IngredientPiece, "delay">[] = [
  {
    src: rosemary,
    alt: "Ramo de alecrim",
    x: 24,
    y: 62,
    size: 108,
    rotate: -16,
    tumble: 30,
    z: 12,
  },
  { src: garlic, alt: "Alho dourado", x: 76, y: 60, size: 84, rotate: 12, tumble: -28, z: 12 },
  {
    src: tomato,
    alt: "Tomate fresco cortado",
    x: 66,
    y: 30,
    size: 112,
    rotate: -10,
    tumble: 26,
    z: 14,
  },
  {
    src: basil,
    alt: "Folhas de manjericão",
    x: 33,
    y: 68,
    size: 96,
    rotate: 16,
    tumble: -26,
    z: 15,
  },
  {
    src: oil,
    alt: "Fio de azeite extravirgem",
    x: 50,
    y: 42,
    size: 140,
    rotate: 4,
    tumble: 12,
    z: 16,
  },
  {
    src: parmesan,
    alt: "Lascas de parmesão",
    x: 45,
    y: 23,
    size: 122,
    rotate: -8,
    tumble: 22,
    z: 17,
  },
  {
    src: pepper,
    alt: "Pimenta-do-reino moída",
    x: 58,
    y: 52,
    size: 66,
    rotate: 22,
    tumble: -34,
    z: 18,
  },
];

/** Mobile groups a few beats together and drops the least essential piece. */
const MOBILE_PIECES: Omit<IngredientPiece, "delay">[] = [
  {
    src: basil,
    alt: "Folhas de manjericão",
    x: 32,
    y: 66,
    size: 78,
    rotate: 14,
    tumble: -24,
    z: 15,
  },
  {
    src: tomato,
    alt: "Tomate fresco cortado",
    x: 66,
    y: 32,
    size: 92,
    rotate: -10,
    tumble: 24,
    z: 14,
  },
  {
    src: parmesan,
    alt: "Lascas de parmesão e ervas",
    x: 48,
    y: 26,
    size: 100,
    rotate: -6,
    tumble: 20,
    z: 17,
  },
  {
    src: pepper,
    alt: "Pimenta-do-reino moída",
    x: 58,
    y: 54,
    size: 54,
    rotate: 20,
    tumble: -28,
    z: 18,
  },
];

export interface PlateAnimationProps {
  reduceMotion: boolean;
  dishTiltX: MotionValue<number>;
  dishTiltY: MotionValue<number>;
}

export function PlateAnimation({ reduceMotion, dishTiltX, dishTiltY }: PlateAnimationProps) {
  const isMobile = useIsMobile();
  const [dishSettled, setDishSettled] = useState(reduceMotion);

  // Mobile plays a shorter, lighter pass: fewer pieces, compressed timeline.
  const pace = isMobile ? 0.62 : 1;
  const pieces = isMobile ? MOBILE_PIECES : DESKTOP_PIECES;

  const dishDelay = 0.2 * pace;
  const gap = (isMobile ? 0.22 : 0.3) * pace;
  const firstBeat = 0.55 * pace;

  const timedPieces: IngredientPiece[] = useMemo(
    () => pieces.map((p, i) => ({ ...p, delay: firstBeat + i * gap })),
    [pieces, firstBeat, gap],
  );

  const lastPieceDelay = timedPieces.reduce((max, p) => Math.max(max, p.delay), dishDelay);
  const approachDelay = lastPieceDelay + 0.35;
  const shineDelay = approachDelay + 0.25;
  const particlesDelay = shineDelay + 0.15;

  return (
    <motion.div
      className="relative aspect-square w-[min(100%,34rem)]"
      style={{ rotateX: dishTiltX, rotateY: dishTiltY, perspective: 1200 }}
      initial={reduceMotion ? false : { scale: 1 }}
      animate={reduceMotion ? { scale: 1 } : { scale: [1, 1, 1.03, 1] }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              duration: 0.6,
              delay: approachDelay,
              times: [0, 0.15, 0.6, 1],
              ease: EASE.organic,
            }
      }
    >
      {/* the foundation — dish drops in first, everything else lands on it */}
      <motion.img
        src={dish}
        alt="Tagliatelle ao tartufo sendo finalizado pelo chef do Savora"
        width={1200}
        height={1200}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-contain"
        style={{
          filter: "drop-shadow(0 40px 50px rgba(0,0,0,0.55))",
          willChange: dishSettled ? undefined : "transform, opacity",
        }}
        initial={reduceMotion ? false : { opacity: 0, scale: 0.88, y: 26 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={
          reduceMotion ? { duration: 0 } : { delay: dishDelay, duration: 0.7, ease: EASE.organic }
        }
        onAnimationComplete={() => setDishSettled(true)}
      />

      {timedPieces.map((piece) => (
        <Ingredient key={piece.alt} piece={piece} reduceMotion={reduceMotion} />
      ))}

      <ShineEffect delay={shineDelay} reduceMotion={reduceMotion} />
      <SeasoningParticles
        count={isMobile ? 5 : 9}
        delay={particlesDelay}
        reduceMotion={reduceMotion}
      />
    </motion.div>
  );
}
