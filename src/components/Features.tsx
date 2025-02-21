
import { Clock, Share2, Shield, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Clock,
    title: "Création Rapide",
    description: "Créez des séances d'entraînement professionnelles en quelques minutes avec notre interface intuitive."
  },
  {
    icon: Shield,
    title: "Validation Expert",
    description: "Faites valider vos séances par des experts pour garantir leur qualité et leur efficacité."
  },
  {
    icon: Share2,
    title: "Partage Facile",
    description: "Partagez vos séances avec votre équipe ou la communauté en un seul clic."
  },
  {
    icon: Trophy,
    title: "Progression Collective",
    description: "Rejoignez une communauté d'entraîneurs et progressez ensemble grâce au partage des connaissances."
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pourquoi Choisir KAP</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tout ce dont vous avez besoin pour créer et gérer des séances d'entraînement professionnelles en un seul endroit.
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
