
import { Clock, Share2, Shield, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Clock,
    title: "Quick Creation",
    description: "Create professional training sessions in minutes with our intuitive interface."
  },
  {
    icon: Shield,
    title: "Expert Validation",
    description: "Get your sessions validated by experts to ensure quality and effectiveness."
  },
  {
    icon: Share2,
    title: "Easy Sharing",
    description: "Share your sessions with your team or the community with just one click."
  },
  {
    icon: Trophy,
    title: "Growth Together",
    description: "Join a community of coaches and grow together through shared knowledge."
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose KAP</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create and manage professional training sessions in one place.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
