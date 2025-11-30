import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const locations = [
  {
    title: "CLUJ — IRIS",
    address: "Strada Oașului 86-90",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Strada+Oașului+86-90,+Cluj-Napoca",
  },
  {
    title: "CLUJ — MĂNĂȘTUR",
    address: "Strada Agricultorilor 1",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Strada+Agricultorilor+1,+Cluj-Napoca",
  },
  {
    title: "FLOREȘTI",
    address: "Strada Eroilor 82B",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Strada+Eroilor+82B,+Florești",
  },
];

const LocationsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            3 Studiouri Private. O Singură Experiență Premium.
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Amplasate strategic pentru a fi aproape de tine. Alege locația cea mai convenabilă.
          </p>
        </motion.div>

        {/* Location Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {locations.map((location, index) => (
            <motion.a
              key={location.title}
              href={location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 text-center border border-border/50 hover:border-primary/20"
            >
              {/* Map Pin Icon */}
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                <MapPin className="w-7 h-7 text-primary" />
              </div>

              {/* Title */}
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                {location.title}
              </h3>

              {/* Address */}
              <p className="text-muted-foreground mb-4">
                {location.address}
              </p>

              {/* Link */}
              <span className="text-sm text-primary font-medium group-hover:underline">
                Vezi pe hartă →
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;
