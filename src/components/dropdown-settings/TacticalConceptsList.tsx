
import { Label } from "@/components/ui/label"
import { AddTacticalConceptDialog } from "./tactical-concepts/AddTacticalConceptDialog"
import { SportSelector } from "./tactical-concepts/SportSelector"
import { TacticalConceptsListComponent } from "./tactical-concepts/TacticalConceptsList"
import { TacticalConceptsListProps } from "@/types/tactical-concepts"

export const TacticalConceptsList = ({ 
  sports, 
  selectedSport, 
  tacticalConcepts, 
  onSportChange,
  onConceptsChange 
}: TacticalConceptsListProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-4">
        <Label>Concept tactique</Label>
        <AddTacticalConceptDialog
          selectedSport={selectedSport}
          onConceptsChange={onConceptsChange}
        />
      </div>

      <SportSelector
        sports={sports}
        selectedSport={selectedSport}
        onSportChange={onSportChange}
      />

      <TacticalConceptsListComponent
        tacticalConcepts={tacticalConcepts}
        onConceptsChange={onConceptsChange}
      />
    </div>
  )
}

