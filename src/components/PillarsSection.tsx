import { motion } from "framer-motion";

const pillars = [
  {
    number: "I",
    title: "Hiper-Activare Musculară",
    subtitle: "Eficiență biologică, nu magie",
    paragraphs: [
      "La sala clasică, creierul tău poate accesa doar 40% din fibrele musculare. Tehnologia EMS schimbă regula jocului: activăm simultan 90% din musculatură, inclusiv straturile profunde imposibil de atins prin exerciții convenționale.",
    ],
  },
  {
    number: "II",
    title: "Compresia Timpului",
    subtitle: "20 de Minute. O dată pe săptămână.",
    paragraphs: [
      "Nu ai nevoie să locuiești în sală pentru a arăta bine. Metoda noastră comprimă 90 de minute de antrenament intens în doar 20 de minute. Rezultatul? Un metabolism accelerat care arde grăsimi timp de 48 de ore după ce ai plecat.",
    ],
  },
  {
    number: "III",
    title: "Nutriție Strategică",
    subtitle: "Carburant, nu privare",
    paragraphs: [
      "Dieta nu trebuie să fie o pedeapsă. Îți construim un Plan Alimentar Personalizat care susține efortul metabolic, nu înfometarea. Primești harta exactă a ceea ce trebuie să mănânci pentru a sculpta corpul, fără să renunți la gust.",
    ],
  },
  {
    number: "IV",
    title: "Intimitate Totală",
    subtitle: "Sanctuarul tău Privat",
    paragraphs: [
      "Spune adio sălilor aglomerate și privirilor indiscrete. Studiourile noastre funcționează în regim privat. Ești doar tu și antrenorul tău, într-un mediu exclusivist unde focusul este 100% pe transformarea ta.",
    ],
  },
];

const PillarsSection = () => {
  return (
    <section className="py-24 bg-card">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4">
            Cei <span className="text-primary">4 Piloni</span> ai Protocolului
            Body Tone
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto" />
        </motion.div>

        {pillars.map((pillar, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="mb-16 border-l-2 border-primary pl-6 md:pl-10"
          >
            <h3 className="text-2xl font-serif text-foreground mb-2">
              Pilonul {pillar.number}: {pillar.title}
            </h3>
            <h4 className="text-gold-400 font-bold text-sm uppercase mb-4">
              {pillar.subtitle}
            </h4>
            {pillar.paragraphs.map((paragraph, pIndex) => (
              <p key={pIndex} className="text-muted-foreground mb-4">
                {paragraph}
              </p>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PillarsSection;
