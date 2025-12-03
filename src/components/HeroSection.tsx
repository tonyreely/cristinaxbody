import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import clientCarmen from "@/assets/client-carmen.png";
import clientSimona from "@/assets/client-simona.png";
import clientDiana from "@/assets/client-diana.png";
import { useCTAModal } from "@/contexts/CTAModalContext";

const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [hasExtended, setHasExtended] = useState(false);
  const { openModal } = useCTAModal();

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleExtendTime = () => {
    if (!hasExtended) {
      setTimeLeft((prev) => prev + 5 * 60);
      setHasExtended(true);
    }
  };

  return (
    <header className="relative pt-0 pb-16 md:pb-32 overflow-hidden">
      {/* Urgency Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-red-600 py-3 px-4 text-center mb-8"
      >
        <p className="text-white font-bold text-sm md:text-base flex items-center justify-center gap-2 flex-wrap">
          <span className="animate-pulse text-lg">⚠️</span>
          <span className="uppercase tracking-wide">ULTIMELE 5 LOCURI:</span>
          <span>Pachetul</span>
          <span className="bg-gold-500 text-richblack-900 px-2 py-0.5 rounded font-black">"2+1 GRATIS"</span>
          <span>la doar</span>
          <span className="text-yellow-300 font-black text-lg md:text-xl">197 RON</span>
          <span className="line-through text-yellow-500 text-sm">297 RON</span>
        </p>
      </motion.div>

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
          className="text-white font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-4 animate-pulse-gold"
        >
          Pentru cei care s-au săturat să slăbească și să se îngrașe la loc...
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl mb-10 max-w-2xl mx-auto"
        >
          <span className="text-foreground">Descoperă cum</span> <span className="text-gold-400">să topești grăsimea încăpățânată</span> <span className="text-foreground">fără să renunți la</span> <span className="text-gold-400">viața ta</span>.
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
          <div onClick={() => (window as any).fbq?.('track', 'InitiateCheckout')}>
            <Button
              variant="hero"
              size="xl"
              onClick={openModal}
            >
              VREAU SĂ ÎNCEP TRANSFORMAREA
            </Button>
          </div>
          <p className="mt-4 text-white text-sm">
            Locuri limitate disponibile pentru luna Decembrie.
          </p>
        </motion.div>

        {/* Scarcity Timer Module */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 mx-auto max-w-xl bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-6 md:p-8"
        >
          <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4 font-display">
            Această ofertă este rezervată pentru tine — dar numai până când cronometrul ajunge la zero.
          </h3>

          <div className="my-6">
            <span className="text-5xl md:text-6xl font-black text-red-600 tabular-nums">
              {formatTime(timeLeft)}
            </span>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Ai nevoie de un moment de gândire? Blochează prețul ca să nu-l pierzi.
          </p>

          <Button
            onClick={handleExtendTime}
            disabled={hasExtended}
            className={`
              w-full sm:w-auto px-4 sm:px-6 py-3 text-sm sm:text-lg font-bold rounded-lg transition-all duration-300 font-display whitespace-normal leading-tight
              ${hasExtended 
                ? "bg-gray-400 text-gray-600 cursor-not-allowed" 
                : "bg-yellow-500 hover:bg-yellow-400 text-gray-900 shadow-lg hover:shadow-xl"
              }
            `}
          >
            {hasExtended ? "✓ Timp prelungit cu 5 minute" : "DA — Vreau încă 5 minute de gândire"}
          </Button>

          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Prelungire disponibilă o singură dată pentru a nu bloca alți clienți.
          </p>
        </motion.div>

        {/* Client Results Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          <div className="bg-card border border-border rounded-xl p-6">
            <img
              src={clientCarmen}
              alt="Carmen - Transformare de slăbire"
              className="w-full rounded-lg mb-4"
            />
            <p className="text-foreground text-lg font-display">
              Carmen „<span className="font-bold text-gold-400">-18.5 kg</span> și o talie subțire, perfect definită în <span className="font-bold text-gold-400">3 luni și jumătate</span>"
            </p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <img
              src={clientSimona}
              alt="Simona - Transformare de slăbire"
              className="w-full rounded-lg mb-4"
            />
            <p className="text-foreground text-lg font-display">
              Simona „<span className="font-bold text-gold-400">-5 kg</span> și înapoi la blugii skinny în doar <span className="font-bold text-gold-400">3 ședințe</span>"
            </p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <img
              src={clientDiana}
              alt="Diana - Transformare de slăbire"
              className="w-full rounded-lg mb-4"
            />
            <p className="text-foreground text-lg font-display">
              Diana „<span className="font-bold text-gold-400">-9 kg</span> și un abdomen ferm, fără înfometare, în <span className="font-bold text-gold-400">10 săptămâni</span>"
            </p>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default HeroSection;
