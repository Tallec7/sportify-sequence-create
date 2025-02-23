
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
      role="region"
      aria-label="Paramètres"
    >
      <AccordionItem value="intensity">
        <AccordionTrigger 
          className="hover:no-underline focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          role="button"
          aria-expanded={activeItem === "intensity"}
        >
          <div className="flex items-center gap-2">
            <span>Niveaux d'intensité</span>
            <Badge 
              variant="secondary"
              className="text-primary-foreground bg-primary/90"
            >
              Intensity
            </Badge>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <SettingsGroup 
            title="Gestion des niveaux d'intensité"
            description="Configurez les différents niveaux d'intensité disponibles pour les séances"
          >
            <IntensityLevelsList 
              intensityLevels={intensityLevels} 
              onIntensityLevelsChange={() => {
                void useIntensityLevelsQuery().refetch()
              }}
            />
          </SettingsGroup>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="levels">
        <AccordionTrigger 
          className="hover:no-underline focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          role="button"
          aria-expanded={activeItem === "levels"}
        >
          <div className="flex items-center gap-2">
            <span>Niveaux de difficulté</span>
            <Badge 
              variant="secondary"
              className="text-primary-foreground bg-primary/90"
            >
              Level
            </Badge>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <SettingsGroup 
            title="Gestion des niveaux de difficulté"
            description="Configurez les différents niveaux de difficulté disponibles pour les exercices"
          >
            <LevelsList 
              levels={levels}
              onLevelsChange={() => {
                void useLevelsQuery().refetch()
              }}
            />
          </SettingsGroup>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="sequence-types">
        <AccordionTrigger 
          className="hover:no-underline focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          role="button"
          aria-expanded={activeItem === "sequence-types"}
        >
          <div className="flex items-center gap-2">
            <span>Types de séquence</span>
            <Badge 
              variant="secondary"
              className="text-primary-foreground bg-primary/90"
            >
              Sequence
            </Badge>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <SettingsGroup 
            title="Gestion des types de séquence"
            description="Configurez les différents types de séquences disponibles"
          >
            <SequenceTypesList 
              sequenceTypes={sequenceTypes}
              onSequenceTypesChange={() => {
                void useSequenceTypesQuery().refetch()
              }}
            />
          </SettingsGroup>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="progression">
        <AccordionTrigger 
          className="hover:no-underline focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          role="button"
          aria-expanded={activeItem === "progression"}
        >
          <div className="flex items-center gap-2">
            <span>Niveaux de progression</span>
            <Badge 
              variant="secondary"
              className="text-primary-foreground bg-primary/90"
            >
              Progression
            </Badge>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <SettingsGroup 
            title="Gestion des niveaux de progression"
            description="Configurez les différents niveaux de progression disponibles"
          >
            <ProgressionLevelsList />
          </SettingsGroup>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
