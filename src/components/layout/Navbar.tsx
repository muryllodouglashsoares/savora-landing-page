import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Menu, X, Phone } from "lucide-react";

import { site } from "@/data/site";
import { EASE } from "@/lib/motion";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Drive the glass transition continuously off scroll position instead of
  // snapping at a threshold — blur, opacity and padding all ease in together.
  const { scrollY } = useScroll();
  const progress = useSpring(useTransform(scrollY, [0, 160], [0, 1], { clamp: true }), {
    stiffness: 220,
    damping: 32,
  });

  const blur = useTransform(progress, [0, 1], [0, 18]);
  const bgOpacity = useTransform(progress, [0, 1], [0, 0.62]);
  const borderOpacity = useTransform(progress, [0, 1], [0, 1]);
  const paddingY = useTransform(progress, [0, 1], ["24px", "12px"]);
  const backdropFilter = useTransform(blur, (v) => `blur(${v}px) saturate(140%)`);
  const background = useTransform(
    bgOpacity,
    (v) => `color-mix(in oklab, var(--background) ${Math.round(v * 100)}%, transparent)`,
  );
  const borderColor = useTransform(
    borderOpacity,
    (v) => `color-mix(in oklab, var(--border) ${Math.round(v * 100)}%, transparent)`,
  );

  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 40));

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: EASE.luxe }}
      style={{
        backdropFilter,
        WebkitBackdropFilter: backdropFilter,
        background,
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
        paddingTop: paddingY,
        paddingBottom: paddingY,
      }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex max-w-7xl items-center justify-between px-6"
      >
        <a
          href="#hero"
          className="font-display text-2xl tracking-[0.3em] text-foreground transition-colors hover:text-gold"
        >
          SAVORA
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="link-underline text-sm tracking-wide text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${site.phone.replace(/\D/g, "")}`}
            className="hidden items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold md:inline-flex"
          >
            <Phone className="size-4" />
            {site.phone}
          </a>
          <a
            href="#reservas"
            className="hidden rounded-full border border-gold/60 px-5 py-2 text-sm text-gold transition-all duration-500 hover:bg-gold hover:text-primary-foreground sm:inline-block"
          >
            Reservar
          </a>
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="rounded-full border border-border p-2 transition-colors hover:border-gold lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE.luxe }}
            className="overflow-hidden lg:hidden"
          >
            <ul
              className={`mx-6 mt-4 space-y-1 rounded-lg border border-border p-4 backdrop-blur-xl ${
                scrolled ? "bg-surface/95" : "bg-background/90"
              }`}
            >
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-surface-2 hover:text-gold"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
