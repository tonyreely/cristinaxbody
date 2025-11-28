import { motion } from "framer-motion";
import founderImage from "@/assets/founder-portrait.jpg";

const FounderSection = () => {
  return (
    <section className="py-20 bg-background relative">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2"
        >
          <div className="relative">
            <div className="absolute -inset-4 border border-primary/30 rounded-sm" />
            <img
              src={founderImage}
              alt="Cristina - xBody Founder"
              className="relative z-10 w-full h-auto grayscale contrast-125 rounded-sm shadow-2xl"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2"
        >
          <h3 className="text-primary font-bold tracking-widest text-sm mb-2 uppercase">
            The Founder
          </h3>
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
            From Michelin Kitchens to{" "}
            <span className="italic text-primary">Peak Performance</span>
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I'm <strong className="text-foreground">Cristina</strong>. Years
              ago, I was working in one of the top restaurants. I was surrounded
              by incredible food, yet I was overweight, lethargic, and ashamed.
            </p>
            <p>
              I thought the only way out was to suffer. To eat bland food. To
              say "no" to social events.
            </p>
            <p>
              I tried every diet. I lost weight, but I lost my joy for life with
              it. And the moment I returned to my normal life, the weight came
              back—with interest.
            </p>
            <p>
              <strong className="text-foreground">The Epiphany:</strong> I
              realized that any protocol requiring me to hate my life was
              destined to fail. I needed a system that treated food as a luxury,
              not an enemy.
            </p>
            <p>
              I spent 5 years developing the{" "}
              <span className="text-primary">xBody Protocol</span>. I lost 25kg
              while drinking Merlot and eating Risotto. Now, I help
              high-performers do the same.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderSection;
