
import { useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SettingsGroup } from "./SettingsGroup"
import { IntensityLevelsList } from "@/components/dropdown-settings/IntensityLevelsList"
import { LevelsList } from "@/components/dropdown-settings/LevelsList"
import { SequenceTypesList } from "@/components/dropdown-settings/SequenceTypesList"
import { ProgressionLevelsList } from "@/components/dropdown-settings/progression-levels/ProgressionLevelsList"
import { Badge } from "@/components/ui/badge"
import { useIntensityLevelsQuery } from "@/hooks/queries/useIntensityLevelsQuery"
import { useLevelsQuery } from "@/hooks/queries/useLevelsQuery"
import { useSequenceTypesQuery } from "@/hooks/queries/useSequenceTypesQuery"

export const SettingsList = () => {
  const [activeItem, setActiveItem] = useState<string | undefined>()
  const { data: intensityLevels = [] } = useIntensityLevelsQuery()
  const { data: levels = [] } = useLevelsQuery()
  const { data: sequenceTypes = [] } = useSequenceTypesQuery()

  const handleItemChange = (value: string) => {
    setActiveItem(value === activeItem ? undefined : value)
  }

  return (
    <Accordion
      type="single"
      collapsible
      value={activeItem}
      onValueChange={handleItemChange}
      className="w-full space-y-4"
    >
      <AccordionItem value="intensity">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center gap-2">
            <span>Niveaux d'intensité</span>
            <Badge variant="secondary">Intensity</Badge>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <SettingsGroup title="Gestion des niveaux d'intensité">
            <IntensityLevelsList 
              intensityLevels={intensityLevels} 
              onIntensityLevelsChange={() => {
                // This will trigger a refetch of the intensity levels
                void useIntensityLevelsQuery().refetch()
              }}
            />
          </SettingsGroup>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="levels">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center gap-2">
            <span>Niveaux de difficulté</span>
            <Badge variant="secondary">Level</Badge>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <SettingsGroup title="Gestion des niveaux de difficulté">
            <LevelsList 
              levels={levels} 
              onLevelsChange={() => {
                // This will trigger a refetch of the levels
                void useLevelsQuery().refetch()
              }}
            />
          </SettingsGroup>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="sequence-types">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center gap-2">
            <span>Types de séquence</span>
            <Badge variant="secondary">Sequence</Badge>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <SettingsGroup title="Gestion des types de séquence">
            <SequenceTypesList 
              sequenceTypes={sequenceTypes} 
              onSequenceTypesChange={() => {
                // This will trigger a refetch of the sequence types
                void useSequenceTypesQuery().refetch()
              }}
            />
          </SettingsGroup>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="progression">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center gap-2">
            <span>Niveaux de progression</span>
            <Badge variant="secondary">Progression</Badge>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <SettingsGroup title="Gestion des niveaux de progression">
            <ProgressionLevelsList />
          </SettingsGroup>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

