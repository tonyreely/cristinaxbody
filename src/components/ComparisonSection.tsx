import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const oldWay = [
  "Ineficiență: 90 de minute de efort pentru a activa doar 40% din mușchi.",
  "Pierdere de Timp: Ore întregi pierdute în trafic, vestiare și așteptând la aparate.",
  "Haos Nutrițional: Diete \"după ureche\" sau costuri extra pentru nutriționist separat.",
  "Mediu Public: Aglomerație, zgomot și senzația inconfortabilă de a fi privit.",
  "Platouri: Săptămâni de muncă fără rezultate vizibile, ducând la demotivare.",
];

const newWay = [
  "Hiper-Eficiență: 20 de minute care activează 90% din musculatură simultan.",
  "Viteză: Un singur antrenament pe săptămână. Intri, te antrenezi, pleci.",
  "Sistem Integrat: Plan alimentar personalizat inclus în pachet, nu vândut separat.",
  "Exclusivitate: Studio privat, 1-la-1 cu antrenorul. Zero public, zero stres.",
  "Rezultate: Tonifiere vizibilă și metabolism accelerat prin tehnologie, nu prin chin.",
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
          De Ce Să Alegi Calea Grea?
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
              Vechiul Mod (Sala Clasică)
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
              Protocolul Body Tone EMS
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
