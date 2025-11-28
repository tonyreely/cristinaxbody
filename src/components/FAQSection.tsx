import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Do I have to cook every day?",
    answer:
      'No. We teach you "Batch Luxury Preparation." You spend 45 minutes twice a week preparing base components, so you can assemble gourmet meals in 5 minutes flat during the week.',
  },
  {
    question: "I have bad knees/back. Can I do the workouts?",
    answer:
      "Absolutely. Our training app includes specific modifications for injuries. We focus on low-impact, high-tension movements that protect your joints while stimulating muscle.",
  },
  {
    question: "Can I still drink alcohol?",
    answer:
      'Yes. We have a specific "Social Protocol" that teaches you how to fit a glass of wine or whiskey into your weekly plan without ruining your progress.',
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
          Common <span className="text-primary">Questions</span>
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
