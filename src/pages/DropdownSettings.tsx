
import { motion } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { useAuthCheck } from "@/hooks/useAuthCheck"
import { SportsList } from "@/components/dropdown-settings/SportsList"
import { TacticalConceptsList } from "@/components/dropdown-settings/TacticalConceptsList"
import { LevelsList } from "@/components/dropdown-settings/LevelsList"
import { IntensityLevelsList } from "@/components/dropdown-settings/IntensityLevelsList"
import { SequenceTypesList } from "@/components/dropdown-settings/SequenceTypesList"
import { SettingsHeader } from "@/components/dropdown-settings/SettingsHeader"
import { useDropdownSettings } from "@/hooks/useDropdownSettings"
import { AgeCategoriesList } from "@/components/dropdown-settings/age-categories/AgeCategoriesList"
import { ActivityTypesList } from "@/components/dropdown-settings/activity-types/ActivityTypesList"
import { ProgressionLevelsList } from "@/components/dropdown-settings/progression-levels/ProgressionLevelsList"

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
    sequenceTypes,
    fetchSports,
    fetchTacticalConcepts,
    fetchLevels,
    fetchIntensityLevels,
    fetchSequenceTypes
  } = useDropdownSettings()

  if (!hasAccess || isLoading) {
    return null
  }

  const staggerDelay = 0.1

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl border bg-card shadow-xl backdrop-blur-lg bg-white/50 dark:bg-gray-900/50 p-8"
      >
        <SettingsHeader />
        
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: staggerDelay }}
          >
            <SportsList 
              sports={sports}
              onSportsChange={fetchSports}
            />
          </motion.div>

          <Separator className="my-8 opacity-50" />

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: staggerDelay * 2 }}
          >
            <TacticalConceptsList 
              sports={sports}
              selectedSport={selectedSport}
              tacticalConcepts={tacticalConcepts}
              onSportChange={setSelectedSport}
              onConceptsChange={() => fetchTacticalConcepts(selectedSport)}
            />
          </motion.div>

          <Separator className="my-8 opacity-50" />

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: staggerDelay * 3 }}
          >
            <AgeCategoriesList />
          </motion.div>

          <Separator className="my-8 opacity-50" />

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: staggerDelay * 4 }}
          >
            <ActivityTypesList />
          </motion.div>

          <Separator className="my-8 opacity-50" />

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: staggerDelay * 5 }}
          >
            <LevelsList
              levels={levels}
              onLevelsChange={fetchLevels}
            />
          </motion.div>

          <Separator className="my-8 opacity-50" />

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: staggerDelay * 6 }}
          >
            <IntensityLevelsList
              intensityLevels={intensityLevels}
              onIntensityLevelsChange={fetchIntensityLevels}
            />
          </motion.div>

          <Separator className="my-8 opacity-50" />

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: staggerDelay * 7 }}
          >
            <SequenceTypesList
              sequenceTypes={sequenceTypes}
              onSequenceTypesChange={fetchSequenceTypes}
            />
          </motion.div>

          <Separator className="my-8 opacity-50" />

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: staggerDelay * 8 }}
          >
            <ProgressionLevelsList />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default DropdownSettings

