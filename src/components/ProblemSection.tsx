import { motion } from "framer-motion";
import { X } from "lucide-react";

const problems = [
  {
    text: "Nu ești dispus să renunți la gust doar ca să slăbești.",
  },
  {
    text: "Te simți expus și judecat în aglomerația sălilor publice.",
  },
  {
    text: "Ai obosit să o iei de la capăt cu dieta în fiecare luni.",
  },
  {
    text: "Vrei rezultatul unui atlet, dar fără să sacrifici timpul cu familia.",
  },
];

const ProblemSection = () => {
  return (
    <section className="py-20 bg-card border-y border-border">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-serif text-center text-foreground mb-12"
        >
          Is This <span className="text-primary italic">Your Reality?</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start"
            >
              <span className="text-destructive text-2xl mr-4 flex-shrink-0">
                <X className="w-6 h-6" />
              </span>
              <p className="text-muted-foreground">{problem.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-xl text-foreground font-serif italic">
            "Dacă te regăsești în măcar unul dintre aceste puncte, următoarele
            minute îți vor schimba viața."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
