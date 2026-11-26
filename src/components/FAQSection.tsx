import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Nu am mai făcut sport de mult timp. O să fac față?",
    answer:
      "Absolut. Protocolul nostru este conceput exact pentru persoane care nu au mai făcut mișcare de mult. Antrenorul ajustează intensitatea în funcție de nivelul tău, iar tehnologia EMS face munca grea în locul tău.",
  },
  {
    question: "Trebuie să țin o dietă strictă pe lângă antrenament?",
    answer:
      "Nu. Îți oferim un Plan Alimentar Personalizat care este sustenabil și flexibil. Nu e vorba de restricții extreme, ci de alegeri inteligente care susțin transformarea ta.",
  },
  {
    question: "Chiar pot înlocui orele de sală cu doar 20 de minute de EMS?",
    answer:
      "Da. Tehnologia EMS activează 90% din musculatură simultan, comparativ cu doar 40% la sala tradițională. 20 de minute de EMS echivalează cu 90 de minute de antrenament clasic.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-3xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-serif text-foreground text-center mb-12"
        >
          Întrebări <span className="text-primary">Frecvente</span>
        </motion.h2>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <AccordionItem
                value={`item-${index}`}
                className="bg-card border border-border rounded-sm overflow-hidden data-[state=open]:border-primary/50 transition-colors"
              >
                <AccordionTrigger className="px-6 py-4 text-foreground font-serif text-lg hover:no-underline hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
