import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";

import { SectionHeading } from "@/components/common/SectionHeading";
import { menuCategories, menuItems, type MenuCategory } from "@/data/menu";
import { MenuCard } from "./MenuCard";

export function MenuSection() {
  const [active, setActive] = useState<MenuCategory>("Entradas");
  const items = useMemo(() => menuItems.filter((item) => item.category === active), [active]);

  return (
    <section id="cardapio" className="relative scroll-mt-24 py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Cardápio digital"
          title="Cada categoria, um capítulo"
          description="Um menu vivo, atualizado pelo chef conforme a estação e o que chega fresco do produtor."
        />

        <LayoutGroup>
          <div className="relative -mx-5 sm:mx-0">
            <div
              role="tablist"
              aria-label="Categorias do cardápio"
              className="mt-10 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mt-14 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden"
            >
              {menuCategories.map((category) => {
                const selected = category === active;
                return (
                  <button
                    key={category}
                    role="tab"
                    type="button"
                    aria-selected={selected}
                    onClick={() => setActive(category)}
                    className={`relative shrink-0 rounded-full px-5 py-3 text-sm tracking-wide transition-colors duration-500 sm:py-2.5 ${
                      selected
                        ? "text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {selected ? (
                      <motion.span
                        layoutId="menu-pill"
                        className="absolute inset-0 rounded-full bg-gold"
                        transition={{ type: "spring", stiffness: 340, damping: 32 }}
                      />
                    ) : (
                      <span className="absolute inset-0 rounded-full border border-border" />
                    )}
                    <span className="relative">{category}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </LayoutGroup>

        {/*
          `MenuCard` não usa mais a prop `layout` do Framer Motion, então o
          `AnimatePresence` aqui só cuida do fade/slide de entrada e saída de
          cada card — sem remedir o grid inteiro a cada troca de categoria
          (que é o que `popLayout` fazia antes, junto com o `layout` do card).
        */}
        <div className="mt-10 grid gap-7 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence initial={false}>
            {items.map((item, index) => (
              <MenuCard key={item.id} item={item} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
