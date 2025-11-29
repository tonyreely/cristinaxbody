import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const HeroSection = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="relative pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold-600 rounded-full blur-[128px]" />
        <div className="absolute top-40 -left-40 w-72 h-72 bg-muted rounded-full blur-[128px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-gold-400 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-4 animate-pulse-gold"
        >
          Protocolul Body Tone
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-6 leading-tight"
        >
          Sculptează-ți Corpul. <br />
          <span className="gold-gradient-text italic">Savurează Stilul de Viață.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
        >
          Descoperă cum să topești grăsimea încăpățânată fără să renunți la cinele în oraș sau la paharul de vin. Nu ai nevoie de înfometare, ai nevoie de activare metabolică și strategie.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative w-full max-w-3xl mx-auto bg-card border border-border rounded-lg shadow-2xl overflow-hidden mb-12 hover:border-primary/50 transition-colors duration-300"
        >
          <div className="relative pt-[56.25%]">
            <iframe
              src="https://player.mediadelivery.net/embed/551605/72384f2f-7a62-4fa7-bdad-feb6d8d2d767?autoplay=false&loop=false&muted=false&preload=true&responsive=true"
              loading="lazy"
              className="absolute top-0 left-0 w-full h-full border-0"
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Button
            variant="hero"
            size="xl"
            onClick={() => scrollToSection("consultation")}
          >
            Vreau să slăbesc inteligent
          </Button>
          <p className="mt-4 text-muted-foreground text-sm">
            Locuri limitate disponibile pentru grupa din această lună.
          </p>
        </motion.div>
      </div>
    </header>
  );
};

export default HeroSection;
