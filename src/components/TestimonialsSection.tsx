import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "I work in finance. Late dinners and drinks are part of the job. Cristina showed me how to navigate client dinners without looking like I was on a diet. Down 18kg and my suits have never fit better.",
    name: "Michael T.",
    role: "Investment Banker",
  },
  {
    quote:
      "I thought menopause meant I was destined to be overweight. The xBody protocol proved me wrong. I eat chocolate every single day and I have visible abs for the first time in 20 years.",
    name: "Sarah J.",
    role: "Interior Designer",
  },
  {
    quote:
      "Simple, effective, and surprisingly luxurious. The recipes alone are worth the price of admission. It feels like a culinary course that accidentally gets you ripped.",
    name: "David R.",
    role: "Architect",
  },
];

const stats = [
  { value: "1,200+", label: "Clients Transformed" },
  { value: "250+", label: "Gourmet Recipes" },
  { value: "100%", label: "Satisfaction" },
  { value: "Global", label: "Community" },
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
          Results Speak <span className="text-primary">Louder</span>
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
