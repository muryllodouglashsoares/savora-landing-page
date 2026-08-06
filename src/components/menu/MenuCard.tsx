import { memo, useMemo } from "react";
import { motion } from "motion/react";
import type { MenuItem } from "@/data/menu";
import { EASE, seeded, range } from "@/lib/motion";

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

/** Deterministic string → int hash, so the same dish always gets the same treatment. */
function hashId(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/**
 * The photo library has far fewer shots than menu items, so several dishes
 * in the same category share a base photo. Rather than show the identical
 * frame twice in one grid, each card gets its own deterministic crop, zoom
 * and mirror — same source image, a different-looking photo per dish.
 */
function usePhotoTreatment(id: string) {
  return useMemo(() => {
    const rand = seeded(hashId(id));
    const posX = Math.round(range(rand, 25, 75));
    const posY = Math.round(range(rand, 25, 75));
    const zoom = Number(range(rand, 1.08, 1.32).toFixed(2));
    const flip = rand() > 0.5 ? -1 : 1;
    const hue = Math.round(range(rand, -8, 8));
    const saturate = Number(range(rand, 0.94, 1.1).toFixed(2));
    return {
      objectPosition: `${posX}% ${posY}%`,
      baseScale: zoom,
      flip,
      filter: `hue-rotate(${hue}deg) saturate(${saturate})`,
    };
  }, [id]);
}

/**
 * Hover/tilt effect: antes disso rodava em JS puro — duas springs do Framer
 * Motion mais um glow recalculado a cada pixel de `pointermove`, disparando
 * um re-render por frame enquanto o mouse estava sobre o card. Com vários
 * cards na tela isso é o tipo de coisa que trava scroll em notebooks/celulares
 * médios. Trocado por `hover:` puro em CSS: mesma sensação de profundidade,
 * porém rodando no compositor da GPU, sem JS a cada movimento do mouse.
 *
 * Detalhe importante: o crop/zoom/espelhamento por prato (`photo.baseScale`,
 * `photo.flip`) precisa ficar num elemento separado do zoom de hover. Um
 * `style={{ transform }}` inline no mesmo elemento sempre vence a classe
 * `group-hover:scale-*` (estilo inline tem prioridade sobre classe, mesmo em
 * :hover), então o zoom ao passar o mouse simplesmente não acontecia antes.
 */
function MenuCardImpl({ item, index }: { item: MenuItem; index: number }) {
  const photo = usePhotoTreatment(item.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index, 5) * 0.05, ease: EASE.luxe }}
      className="card-luxe group relative overflow-hidden rounded-xl transition-[transform,border-color] duration-500 will-change-transform hover:-translate-y-2 hover:border-gold/50"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* Crop/zoom/espelhamento fixos do prato — calculados uma vez, sem custo de runtime. */}
        <div
          className="absolute inset-0"
          style={{ transform: `scale(${photo.baseScale}) scaleX(${photo.flip})` }}
        >
          {/* Zoom de hover, isolado num elemento próprio para não colidir com o transform acima. */}
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            decoding="async"
            width={640}
            height={480}
            style={{ objectPosition: photo.objectPosition, filter: photo.filter }}
            className="size-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
        </div>

        {/* Brilho dourado sutil no hover — puramente CSS, sem rastrear o cursor. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 40%, color-mix(in oklab, var(--gold) 16%, transparent), transparent 70%)",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        {item.tag ? (
          <span className="absolute left-4 top-4 rounded-full border border-gold/40 bg-background/70 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-gold backdrop-blur">
            {item.tag}
          </span>
        ) : null}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl leading-tight">{item.name}</h3>
          <span className="shrink-0 font-display text-xl text-gold">
            {currency.format(item.price)}
          </span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {item.ingredients.map((ingredient) => (
            <li
              key={ingredient}
              className="rounded-full bg-surface-2 px-3 py-1 text-[0.7rem] text-muted-foreground transition-colors duration-500 group-hover:text-foreground"
            >
              {ingredient}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

// Evita re-render dos cards que não mudaram quando o pai re-renderiza
// (ex.: outro card recebendo hover, ou o estado da aba ativa mudando).
export const MenuCard = memo(MenuCardImpl);
