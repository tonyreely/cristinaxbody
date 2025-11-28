import { motion } from "framer-motion";

const pillars = [
  {
    number: "I",
    title: "Metabolic Luxury",
    subtitle: 'Why you don\'t need to eat "Clean"',
    paragraphs: [
      "The fitness industry lies to you. They say sugar makes you fat. They say pasta is the enemy. False. Fat loss is a mathematical equation of thermodynamics, not a moral judgment of food purity.",
      'We calculate your "Luxury Budget" (calories). As long as you stay within this budget, you can spend it on steak, wine, or chocolate. We teach you how to bank calories for a big dinner so you never have to be "that person" ordering a salad at a steakhouse.',
    ],
  },
  {
    number: "II",
    title: "Protein Anchoring",
    subtitle: "The secret to staying full",
    paragraphs: [
      "Hunger is the enemy of consistency. The solution isn't willpower; it's biology. By anchoring every day with high-quality protein, you suppress the hunger hormone (ghrelin).",
      "We provide gourmet recipes—Seared Scallops, Beef Wellington, Truffle Chicken—that hit your protein targets while tasting like a 5-star meal.",
    ],
  },
  {
    number: "III",
    title: "Minimal Effective Dose",
    subtitle: "30 Minutes, 3 Times a Week",
    paragraphs: [
      "You are not a bodybuilder. You are a busy professional. You do not need to live in the gym.",
      "Our training protocol focuses on high-intensity resistance training. 3 sessions a week. 30-40 minutes. We focus on compound movements that signal your body to hold onto muscle while the fat melts off.",
    ],
  },
  {
    number: "IV",
    title: "Lifestyle Integration",
    subtitle: "The Exit Strategy",
    paragraphs: [
      "Most diets fail because they don't have an exit strategy. Once you hit your goal weight, what then?",
      'We teach you the "Maintenance Protocol." How to transition from fat loss to lifestyle management so you stay lean for decades, not just weeks. This is the last transformation you will ever need.',
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
            The <span className="text-primary">4 Pillars</span> of Gourmet Fat
            Loss
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
              Pillar {pillar.number}: {pillar.title}
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
