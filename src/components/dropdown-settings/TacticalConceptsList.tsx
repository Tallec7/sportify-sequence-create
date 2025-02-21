
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AddTacticalConceptDialog } from "./tactical-concepts/AddTacticalConceptDialog"
import { TacticalConceptItem } from "./tactical-concepts/TacticalConceptItem"
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

      <Select
        value={selectedSport}
        onValueChange={onSportChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Sélectionnez un sport" />
        </SelectTrigger>
        <SelectContent>
          {sports.map((sport) => (
            <SelectItem key={sport.value} value={sport.value}>
              {sport.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="space-y-2 mt-4">
        {tacticalConcepts.map((concept) => (
          <TacticalConceptItem
            key={concept.id}
            concept={concept}
            onConceptsChange={onConceptsChange}
          />
        ))}
      </div>
    </div>
  )
}
