import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { faqs } from "@/data/site";

export function Faq() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading eyebrow="Dúvidas" title="Perguntas frequentes" variant="discrete" />

        <Reveal delay={0.1} variant="discrete">
          <Accordion type="single" collapsible className="mt-14 w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.q} value={`item-${index}`} className="border-border">
                <AccordionTrigger className="py-6 text-left font-display text-xl hover:text-gold hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
