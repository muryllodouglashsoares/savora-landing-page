import { motion } from "motion/react";
import { Sparkles, Droplets, Leaf, CircleDot, Snowflake, Flame } from "lucide-react";

import { SectionHeading } from "@/components/common/SectionHeading";
import { ingredients } from "@/data/site";

const icons = { Sparkles, Droplets, Leaf, CircleDot, Snowflake, Flame } as const;

export function Ingredients() {
  return (
    <section className="border-y border-border bg-surface/30 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Ingredientes"
          title="Origem que se prova"
          description="Rastreamos cada item essencial da cozinha até o produtor que o cultivou."
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ingredients.map((item, index) => {
            const Icon = icons[item.icon as keyof typeof icons];
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.07 }}
                whileHover={{ x: 6 }}
                className="group flex items-center gap-5 rounded-lg border border-border bg-background/40 p-5 transition-colors duration-500 hover:border-gold/50"
              >
                <span className="grid size-11 place-items-center rounded-full border border-gold/30 text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-primary-foreground">
                  <Icon className="size-4" />
                </span>
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {item.origin}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
