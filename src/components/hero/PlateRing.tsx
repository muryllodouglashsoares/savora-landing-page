import { motion } from "motion/react";

interface Props {
  reduceMotion: boolean;
  delay: number;
}

/**
 * A gold aura around the plate: a soft ambient glow breathing behind it,
 * a faint hairline so the rim always reads as gilded, and a brighter
 * comet-like arc that circles the plate slowly and continuously forever.
 */
export function PlateRing({ reduceMotion, delay }: Props) {
  if (reduceMotion) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[7%] rounded-full opacity-50"
        style={{
          boxShadow: "0 0 0 1px color-mix(in oklab, var(--gold) 55%, transparent)",
        }}
      />
    );
  }

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {/* ambient halo — a slow breathing glow that sits behind the arc */}
      <motion.div
        className="absolute inset-[5%] rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--gold) 55%, transparent) 0%, transparent 68%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.14, 0.4, 0.14] }}
        transition={{ delay, duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* hairline — the rim always reads as gilded, even between passes */}
      <div
        className="absolute inset-[7%] rounded-full"
        style={{
          boxShadow: "0 0 0 1px color-mix(in oklab, var(--gold) 28%, transparent)",
        }}
      />

      {/* the comet — a bright gradient arc that circles the plate forever */}
      <motion.div
        className="absolute inset-[7%] rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, color-mix(in oklab, var(--gold) 45%, transparent) 28deg, color-mix(in oklab, var(--gold) 95%, white 10%) 46deg, color-mix(in oklab, var(--gold) 45%, transparent) 64deg, transparent 130deg, transparent 360deg)",
          WebkitMaskImage:
            "radial-gradient(farthest-side, transparent calc(100% - 3.5px), black calc(100% - 3.5px))",
          maskImage:
            "radial-gradient(farthest-side, transparent calc(100% - 3.5px), black calc(100% - 3.5px))",
          filter: "drop-shadow(0 0 7px color-mix(in oklab, var(--gold) 75%, transparent))",
        }}
        initial={{ rotate: 0, opacity: 0 }}
        animate={{ rotate: 360, opacity: 1 }}
        transition={{
          rotate: { delay, duration: 9, repeat: Infinity, ease: "linear" },
          opacity: { delay, duration: 1.1, ease: "easeOut" },
        }}
      />
    </div>
  );
}
