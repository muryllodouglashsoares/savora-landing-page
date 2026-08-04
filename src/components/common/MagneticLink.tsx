import { motion, type HTMLMotionProps } from "motion/react";

import { useMagnetic } from "@/lib/motion";

interface MagneticLinkProps extends HTMLMotionProps<"a"> {
  strength?: number;
}

/**
 * Drop-in replacement for a CTA `<a>`. Leans a few px toward the cursor and
 * gives a light tap-down on click, so buttons read as physical objects
 * instead of flat hit targets.
 */
export function MagneticLink({ strength = 10, style, children, ...props }: MagneticLinkProps) {
  const magnetic = useMagnetic<HTMLAnchorElement>(strength);

  return (
    <motion.a
      ref={magnetic.ref}
      onPointerMove={magnetic.onPointerMove}
      onPointerLeave={magnetic.onPointerLeave}
      whileTap={{ scale: 0.96 }}
      style={{ ...magnetic.style, ...style }}
      {...props}
    >
      {children}
    </motion.a>
  );
}
