import { motion } from "motion/react";

interface Props {
  /** Seconds before the sweep starts. */
  delay: number;
  reduceMotion: boolean;
}

/**
 * A single soft light sweep across the finished dish — the "the chef just
 * finished plating this" moment. Runs once, only `transform` + `opacity`,
 * no blur filter (a plain gradient reads as a highlight without the paint
 * cost of a blurred layer).
 */
export function ShineEffect({ delay, reduceMotion }: Props) {
  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-30 overflow-hidden rounded-[50%]"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 0.85, delay, times: [0, 0.4, 1], ease: "easeInOut" }}
    >
      <motion.div
        className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent"
        initial={{ x: "-60%" }}
        animate={{ x: "320%" }}
        transition={{ duration: 0.85, delay, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
