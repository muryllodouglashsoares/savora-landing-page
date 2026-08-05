import { motion } from "motion/react";
import { useState } from "react";

/**
 * A single piece the "chef" places on the plate. Falls in once, settles with
 * a small natural bounce, then goes completely still — no loops, no filters,
 * only `transform` (x/y/rotate/scale) and `opacity`, so it stays cheap even
 * with several pieces landing in the same couple of seconds.
 */
export interface IngredientPiece {
  src: string;
  alt: string;
  /** Final resting position, in % of the plate container. */
  x: number;
  y: number;
  /** Rendered width in px at the largest breakpoint. */
  size: number;
  /** Rest rotation once settled. */
  rotate?: number;
  /** Extra rotation it arrives with, unwound as it falls (a little tumble). */
  tumble?: number;
  /** Seconds before this piece starts falling. */
  delay: number;
  z?: number;
}

interface Props {
  piece: IngredientPiece;
  reduceMotion: boolean;
  scale?: number;
}

export function Ingredient({ piece, reduceMotion, scale = 1 }: Props) {
  const { src, alt, x, y, size, rotate = 0, tumble = 24, delay, z = 10 } = piece;
  const [settled, setSettled] = useState(reduceMotion);

  return (
    <motion.img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="pointer-events-none absolute select-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size * scale,
        height: "auto",
        zIndex: z,
        translateX: "-50%",
        translateY: "-50%",
        filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.35))",
        willChange: settled ? undefined : "transform, opacity",
      }}
      initial={reduceMotion ? false : { opacity: 0, y: -34, rotate: rotate + tumble, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, rotate, scale: 1 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              opacity: { duration: 0.3, delay, ease: "easeOut" },
              y: { delay, type: "spring", stiffness: 190, damping: 11, mass: 0.6 },
              rotate: { delay, type: "spring", stiffness: 160, damping: 13, mass: 0.6 },
              scale: { delay, type: "spring", stiffness: 210, damping: 13, mass: 0.55 },
            }
      }
      onAnimationComplete={() => setSettled(true)}
    />
  );
}
