
import { motion } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { useAuthCheck } from "@/hooks/useAuthCheck"
import { SportsList } from "@/components/dropdown-settings/SportsList"
import { TacticalConceptsList } from "@/components/dropdown-settings/TacticalConceptsList"
import { LevelsList } from "@/components/dropdown-settings/LevelsList"
import { IntensityLevelsList } from "@/components/dropdown-settings/IntensityLevelsList"
import { SettingsHeader } from "@/components/dropdown-settings/SettingsHeader"
import { useDropdownSettings } from "@/hooks/useDropdownSettings"

const DropdownSettings = () => {
  useAuthCheck()
  const {
    hasAccess,
    isLoading,
    sports,
    selectedSport,
    setSelectedSport,
    tacticalConcepts,
    levels,
    intensityLevels,
    fetchSports,
    fetchTacticalConcepts,
    fetchLevels,
    fetchIntensityLevels
  } = useDropdownSettings()

  if (!hasAccess || isLoading) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl border bg-card shadow-lg backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 p-8"
      >
        <SettingsHeader />
        
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <SportsList 
              sports={sports}
              onSportsChange={fetchSports}
            />
          </motion.div>

          <Separator className="my-8" />

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <TacticalConceptsList 
              sports={sports}
              selectedSport={selectedSport}
              tacticalConcepts={tacticalConcepts}
              onSportChange={setSelectedSport}
              onConceptsChange={() => fetchTacticalConcepts(selectedSport)}
            />
          </motion.div>

          <Separator className="my-8" />

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <LevelsList
              levels={levels}
              onLevelsChange={fetchLevels}
            />
          </motion.div>

          <Separator className="my-8" />

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <IntensityLevelsList
              intensityLevels={intensityLevels}
              onIntensityLevelsChange={fetchIntensityLevels}
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default DropdownSettings
