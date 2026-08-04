import { motion, type HTMLMotionProps } from "motion/react";

import { useMagnetic } from "@/lib/motion";

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  strength?: number;
}

/** Same physical hover/tap language as MagneticLink, for `<button>` elements. */
export function MagneticButton({ strength = 8, style, children, ...props }: MagneticButtonProps) {
  const magnetic = useMagnetic<HTMLButtonElement>(strength);

  return (
    <motion.button
      ref={magnetic.ref}
      onPointerMove={magnetic.onPointerMove}
      onPointerLeave={magnetic.onPointerLeave}
      whileTap={{ scale: 0.97 }}
      style={{ ...magnetic.style, ...style }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
