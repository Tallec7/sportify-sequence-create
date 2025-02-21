
import { motion } from "framer-motion"

export const SettingsHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mb-8"
    >
      <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">
        Paramètres des listes déroulantes
      </h2>
      <p className="text-muted-foreground">
        Gérez les sports et les concepts tactiques disponibles dans l'application
      </p>
    </motion.div>
  )
}
