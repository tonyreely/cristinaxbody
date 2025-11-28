import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const oldWay = [
  "Bland, boiled food",
  "Expensive Personal Trainer ($800/mo)",
  "Confusing supplements ($200/mo)",
  "Hours of boring cardio",
  "Rebound weight gain",
];

const newWay = [
  "Eat foods you actually love",
  "Fraction of the cost of a PT",
  "No pills, teas, or gimmicks",
  "30-min optimized workouts",
  "Results that last a lifetime",
];

const ComparisonSection = () => {
  return (
    <section className="py-20 bg-card border-t border-border">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl font-serif text-foreground mb-12"
        >
          The Cost of Inaction
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-background border border-primary/20 rounded-lg overflow-hidden flex flex-col md:flex-row"
        >
          {/* Left: The Old Way */}
          <div className="p-8 md:w-1/2 border-b md:border-b-0 md:border-r border-border">
            <h3 className="text-muted-foreground uppercase tracking-widest text-sm font-bold mb-6">
              The Hard Way
            </h3>
            <ul className="space-y-4">
              {oldWay.map((item, index) => (
                <li key={index} className="flex items-center text-muted-foreground">
                  <X className="w-5 h-5 mr-3 text-destructive/60" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: The New Way */}
          <div className="p-8 md:w-1/2 bg-primary/5">
            <h3 className="text-primary uppercase tracking-widest text-sm font-bold mb-6">
              The xBody Way
            </h3>
            <ul className="space-y-4">
              {newWay.map((item, index) => (
                <li key={index} className="flex items-center text-foreground">
                  <Check className="w-5 h-5 mr-3 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonSection;
