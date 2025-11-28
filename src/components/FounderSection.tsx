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
            Fondatoarea
          </h3>
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
            De la Greutate la{" "}
            <span className="italic text-primary">Transformare</span>
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Nu m-am născut cu un metabolism rapid. Dimpotrivă. Copilăria mea a fost marcată de lupta constantă cu greutatea și de glumele celor din jur. Am crescut crezând că „a fi în formă" este un privilegiu rezervat altora, nu mie.
            </p>
            <p>
              <strong className="text-foreground">Am refuzat să accept asta. Am căutat soluții, nu scuze.</strong>
            </p>
            <p>
              Totul s-a schimbat când am devenit clientă EMS. Rezultatele au fost șocante, corpul meu se transforma văzând cu ochii, fără să îmi sacrific tot timpul liber în sală. Am realizat că problema nu era corpul meu, ci metodele ineficiente pe care le folosisem.
            </p>
            <p>
              Am fondat <span className="text-primary">Body Tone</span> dintr-o convingere simplă: nimeni nu ar trebui să sufere pentru a arăta bine. Am transformat propria mea luptă într-un protocol de succes, pentru ca tu să ai acces direct la soluția care funcționează, fără să treci prin anii de încercări prin care am trecut eu.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderSection;
