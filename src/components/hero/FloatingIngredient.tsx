import { motion, useSpring, useTransform, type MotionValue } from "motion/react";
import { useMemo } from "react";

import { EASE, SPRING, driftPeriods, seeded, range, usePrefersReducedMotion } from "@/lib/motion";

export interface Ingredient {
  src: string;
  alt: string;
  /** position in % of the hero box */
  x: number;
  y: number;
  /** rendered width in px (desktop) */
  size: number;
  /** 0 = far background, 1 = right in front of the lens */
  depth: number;
  rotate?: number;
  blur?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  drift?: number;
  z?: number;
  hideOnMobile?: boolean;
  /**
   * Which beat of the plating sequence this piece lands on (0 = first).
   * Drives both its entrance delay and the direction it seems to arrive
   * from, so the Hero reads as one dish being assembled, not N sprites
   * fading in together.
   */
  stage?: number;
}

interface Props {
  ingredient: Ingredient;
  index: number;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  scrollY: MotionValue<number>;
}

export function FloatingIngredient({ ingredient, index, pointerX, pointerY, scrollY }: Props) {
  const {
    src,
    alt,
    x,
    y,
    size,
    depth,
    rotate = 0,
    blur = 0,
    opacity = 1,
    duration = 7,
    delay = 0,
    drift = 14,
    z = 0,
    hideOnMobile,
  } = ingredient;

  const reduceMotion = usePrefersReducedMotion();

  // Each instance gets its own deterministic pseudo-random voice, so no two
  // ingredients — even ones sharing a sprite — ever move in lockstep.
  const rng = useMemo(
    () => seeded(index * 97 + Math.round(x * 13) + Math.round(y * 7)),
    [index, x, y],
  );
  const periods = useMemo(() => driftPeriods(duration, rng), [duration, rng]);
  const tumbleAmount = useMemo(() => range(rng, 4, 12) * (0.4 + depth), [rng, depth]);
  // The direction each piece seems to fly in from — closer pieces travel
  // further, as if just tossed into frame; distant pieces barely shift.
  const arriveAngle = useMemo(() => range(rng, 0, Math.PI * 2), [rng]);
  const arriveDistance = 18 + depth * 46;
  const arriveX = Math.cos(arriveAngle) * arriveDistance;
  const arriveY = Math.sin(arriveAngle) * arriveDistance * 0.6 + 22; // slight downward bias — gravity

  // Closer elements react more to the pointer and scroll — classic parallax depth.
  const strength = 12 + depth * 70;
  const px = useSpring(useTransform(pointerX, [-1, 1], [-strength, strength]), {
    stiffness: 60,
    damping: 22,
    mass: 0.6,
  });
  const py = useSpring(useTransform(pointerY, [-1, 1], [-strength * 0.7, strength * 0.7]), {
    stiffness: 60,
    damping: 22,
    mass: 0.6,
  });
  const scrollShift = useTransform(scrollY, [0, 1], [0, -160 - depth * 420]);
  const scrollFade = useTransform(scrollY, [0, 0.85], [opacity, 0]);

  // Organic, non-repeating float paths: uneven keyframe spacing per axis so
  // x, y and rotate never fall back into sync with one another.
  const floatY = reduceMotion ? undefined : [-drift, drift * 0.6, drift, -drift * 0.4, -drift];
  const floatX = reduceMotion
    ? undefined
    : [drift * 0.35, -drift * 0.5, -drift * 0.1, drift * 0.4, drift * 0.35];
  const floatTimes = [0, 0.3, 0.55, 0.8, 1];

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute will-change-transform ${
        hideOnMobile ? "hidden md:block" : ""
      }`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        x: px,
        y: py,
        zIndex: z,
        opacity: scrollFade,
        perspective: 800,
      }}
    >
      <motion.div style={{ y: scrollShift }}>
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="select-none"
          style={{
            width: size,
            height: "auto",
            filter: blur
              ? `blur(${blur}px) drop-shadow(0 24px 40px rgba(0,0,0,.55))`
              : "drop-shadow(0 24px 40px rgba(0,0,0,.55))",
          }}
          initial={{
            opacity: 0,
            scale: 0.5,
            x: arriveX,
            y: arriveY,
            rotate: rotate + (arriveAngle > Math.PI ? -26 : 26),
            rotateX: 25,
            rotateY: 25,
          }}
          animate={
            reduceMotion
              ? { opacity: 1, scale: 1, x: 0, y: 0, rotate, rotateX: 0, rotateY: 0 }
              : {
                  opacity: 1,
                  scale: 1,
                  x: [0, floatX?.[0] ?? 0, floatX?.[1] ?? 0, floatX?.[2] ?? 0, floatX?.[3] ?? 0],
                  y: [0, floatY?.[0] ?? 0, floatY?.[1] ?? 0, floatY?.[2] ?? 0, floatY?.[3] ?? 0],
                  rotate: [
                    rotate,
                    rotate - tumbleAmount * 0.5,
                    rotate + tumbleAmount,
                    rotate - tumbleAmount * 0.3,
                    rotate,
                  ],
                  rotateX: [0, tumbleAmount * 0.4, -tumbleAmount * 0.3, tumbleAmount * 0.2, 0],
                  rotateY: [0, -tumbleAmount * 0.5, tumbleAmount * 0.4, -tumbleAmount * 0.2, 0],
                }
          }
          transition={{
            opacity: { duration: 0.9, delay, ease: EASE.crisp },
            scale: { duration: 1.1, delay, ...SPRING.landing },
            x: reduceMotion
              ? { duration: 0.9, delay, ease: EASE.settle }
              : {
                  duration: periods.x,
                  times: floatTimes,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: delay + 1.1,
                },
            y: reduceMotion
              ? { duration: 0.9, delay, ease: EASE.settle }
              : {
                  duration: periods.y,
                  times: floatTimes,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: delay + 1.1,
                },
            rotate: reduceMotion
              ? { duration: 0.9, delay, ease: EASE.settle }
              : {
                  duration: periods.rotate,
                  times: floatTimes,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: delay + 1.1,
                },
            rotateX: {
              duration: periods.tumble,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay + 1.1,
            },
            rotateY: {
              duration: periods.tumble * 1.15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay + 1.1,
            },
          }}
        />
      </motion.div>
    </motion.div>
  );
}
