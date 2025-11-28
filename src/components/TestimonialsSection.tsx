import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Lucrez în management, iar prânzurile de afaceri sunt obligatorii. Cristina nu mi-a 'interzis' restaurantul, ci m-a învățat cum să navighez meniul strategic, fără să par că sunt la dietă în fața clienților. Am dat jos 18 kg, iar costumele mele nu s-au așezat niciodată mai bine. Cel mai bun ROI al timpului meu.",
    name: "Andrei M.",
    role: "Antreprenor & Investitor",
  },
  {
    quote:
      "Credeam că 'metabolismul lent' de după 40 de ani este o sentință definitivă. Protocolul Body Tone mi-a demonstrat contrariul. Nu am renunțat la ciocolată (o mănânc zilnic, dar calculat) și am abdomenul plat pentru prima dată în ultimii 15 ani. Nu e magie, e pură biologie.",
    name: "Elena S.",
    role: "Designer de Interior",
  },
  {
    quote:
      "Simplu, eficient și surprinzător de exclusivist. Faptul că sunt singur în studio, fără aglomerație, schimbă totul. Planul alimentar se simte ca un stil de viață, nu ca o pedeapsă. Mă simt ca și cum aș trișa sistemul: efort minim, rezultate de atlet.",
    name: "Radu D.",
    role: "Senior Software Developer",
  },
];

const stats = [
  { value: "800+", label: "Clienți Transformați" },
  { value: "100%", label: "Satisfacție" },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-serif text-center text-foreground mb-16"
        >
          Rezultatele Vorbesc <span className="text-primary">Mai Tare Decât Promisiunile</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card p-8 border border-border rounded-sm hover:border-primary/50 transition duration-300"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-primary fill-current"
                  />
                ))}
              </div>
              <p className="text-muted-foreground italic mb-6">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-muted rounded-full mr-3" />
                <div>
                  <p className="text-foreground font-bold">{testimonial.name}</p>
                  <p className="text-xs text-primary uppercase">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 text-center border-t border-border pt-10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <p className="text-3xl font-serif text-primary font-bold">
                {stat.value}
              </p>
              <p className="text-muted-foreground text-sm uppercase tracking-widest mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
