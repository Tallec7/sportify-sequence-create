
import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
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

  if (!hasAccess) {
    return null
  }

  const staggerDelay = 0.1

  return (
    <div className="min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="container max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-xl border bg-card shadow-md backdrop-blur-lg p-8 space-y-8"
        >
          <SettingsHeader />
          
          {isLoading ? (
            <div className="space-y-8">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-32" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              <motion.section
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: staggerDelay }}
                className="space-y-4"
              >
                <SportsList 
                  sports={sports}
                  onSportsChange={fetchSports}
                />
              </motion.section>

              <Separator className="my-8 bg-border/50" />

              <motion.section
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: staggerDelay * 2 }}
                className="space-y-4"
              >
                <TacticalConceptsList 
                  sports={sports}
                  selectedSport={selectedSport}
                  tacticalConcepts={tacticalConcepts}
                  onSportChange={setSelectedSport}
                  onConceptsChange={() => fetchTacticalConcepts(selectedSport)}
                />
              </motion.section>

              <Separator className="my-8 bg-border/50" />

              <motion.section
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: staggerDelay * 3 }}
                className="space-y-4"
              >
                <AgeCategoriesList />
              </motion.section>

              <Separator className="my-8 bg-border/50" />

              <motion.section
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: staggerDelay * 4 }}
                className="space-y-4"
              >
                <ActivityTypesList />
              </motion.section>

              <Separator className="my-8 bg-border/50" />

              <motion.section
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: staggerDelay * 5 }}
                className="space-y-4"
              >
                <LevelsList
                  levels={levels}
                  onLevelsChange={fetchLevels}
                />
              </motion.section>

              <Separator className="my-8 bg-border/50" />

              <motion.section
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: staggerDelay * 6 }}
                className="space-y-4"
              >
                <IntensityLevelsList
                  intensityLevels={intensityLevels}
                  onIntensityLevelsChange={fetchIntensityLevels}
                />
              </motion.section>

              <Separator className="my-8 bg-border/50" />

              <motion.section
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: staggerDelay * 7 }}
                className="space-y-4"
              >
                <SequenceTypesList
                  sequenceTypes={sequenceTypes}
                  onSequenceTypesChange={fetchSequenceTypes}
                />
              </motion.section>

              <Separator className="my-8 bg-border/50" />

              <motion.section
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: staggerDelay * 8 }}
                className="space-y-4"
              >
                <ProgressionLevelsList />
              </motion.section>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default DropdownSettings
