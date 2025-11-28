import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section
      id="consultation"
      className="py-24 bg-gradient-to-b from-card to-richblack border-t border-border text-center"
    >
      <div className="max-w-3xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-serif text-foreground mb-6"
        >
          20 de Minute care îți Definesc Viitorul.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-muted-foreground mb-10 text-lg"
        >
          Timpul este singura resursă pe care nu o poți recupera. Cu fiecare
          săptămână în care amâni, distanța dintre tine și corpul dorit crește.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button variant="hero" size="xl">
            Vreau să slăbesc inteligent
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-muted-foreground text-sm"
        >
          &copy; 2024 xBody by Cristina. All Rights Reserved. <br />
          <a
            href="#"
            className="hover:text-primary underline transition-colors"
          >
            Privacy Policy
          </a>{" "}
          |{" "}
          <a
            href="#"
            className="hover:text-primary underline transition-colors"
          >
            Terms of Service
          </a>
        </motion.p>
      </div>
    </section>
  );
};

export default CTASection;
