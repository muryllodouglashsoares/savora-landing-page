import { motion } from "motion/react";

interface Props {
  reduceMotion: boolean;
  delay: number;
}

/**
 * The "forming border" moment from first load — a thin gold ring that
 * draws itself around the plate — except here it never stops. It draws,
 * holds a beat, fades, pauses, and draws again, forever, at a slow and
 * quiet pace so it reads as ambience rather than a loading spinner.
 */
export function PlateRing({ reduceMotion, delay }: Props) {
  if (reduceMotion) {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        className="pointer-events-none absolute inset-[7%] opacity-40"
      >
        <circle cx="50" cy="50" r="47" fill="none" stroke="var(--gold)" strokeWidth="0.6" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      className="pointer-events-none absolute inset-[7%] -rotate-90"
    >
      <motion.circle
        cx="50"
        cy="50"
        r="47"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="0.55"
        strokeLinecap="round"
        style={{ filter: "drop-shadow(0 0 5px var(--gold))" }}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.85, 0.85, 0] }}
        transition={{
          delay,
          duration: 5.2,
          times: [0, 0.42, 0.78, 1],
          repeat: Infinity,
          repeatDelay: 1.8,
          ease: "easeInOut",
        }}
      />
    </svg>
  );
}
