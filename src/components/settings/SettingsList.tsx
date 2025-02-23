
import { useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SettingsGroup } from "./SettingsGroup"
import { IntensityLevelsList } from "@/components/dropdown-settings/intensity-levels/IntensityLevelsList"
import { LevelsList } from "@/components/dropdown-settings/levels/LevelsList"
import { SequenceTypesList } from "@/components/dropdown-settings/sequence-types/SequenceTypesList"
import { ProgressionLevelsList } from "@/components/dropdown-settings/progression-levels/ProgressionLevelsList"
import { Badge } from "@/components/ui/badge"

export const SettingsList = () => {
  const [activeItem, setActiveItem] = useState<string | undefined>()

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
            <IntensityLevelsList />
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
            <LevelsList />
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
            <SequenceTypesList />
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
