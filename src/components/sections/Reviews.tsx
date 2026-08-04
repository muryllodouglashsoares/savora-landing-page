import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

import { SectionHeading } from "@/components/common/SectionHeading";
import { reviews } from "@/data/site";
import { SPRING } from "@/lib/motion";

export function Reviews() {
  return (
    <section className="border-y border-border bg-surface/30 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Avaliações"
          title="O que dizem à mesa"
          description="Notas reais de quem já sentou conosco — críticos, sommeliers e habitués."
          variant="story"
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {reviews.map((review, index) => (
            <motion.blockquote
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.08, ...SPRING.medium }}
              whileHover={{ y: -8, transition: SPRING.light }}
              className="card-luxe relative rounded-xl p-7 hover:border-gold/50"
            >
              <Quote className="size-6 text-gold/40" />
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">“{review.text}”</p>
              <div className="mt-6 flex gap-1" aria-label={`${review.rating} de 5 estrelas`}>
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-gold text-gold" />
                ))}
              </div>
              <footer className="mt-5 border-t border-border pt-4">
                <p className="text-sm">{review.name}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {review.role}
                </p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
