
import { Exercise } from "@/types/sequence"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TacticalConcept } from "@/types/sequence"
import { ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TacticalConceptsFieldProps {
  exercise: Exercise
  onChange: (exercise: Exercise) => void
}

export const TacticalConceptsField = ({ exercise, onChange }: TacticalConceptsFieldProps) => {
  const tacticalConcepts: TacticalConcept[] = [
    "montee_de_balle",
    "repli_defensif",
    "contre_attaque",
    "attaque_placee",
    "defense_alignee",
    "defense_etagee"
  ]

  const getConceptLabel = (concept: TacticalConcept) => {
    const labels: Record<TacticalConcept, string> = {
      montee_de_balle: "Montée de balle",
      repli_defensif: "Repli défensif",
      contre_attaque: "Contre-attaque",
      attaque_placee: "Attaque placée",
      defense_alignee: "Défense alignée",
      defense_etagee: "Défense étagée"
    }
    return labels[concept]
  }

  const handleAddConcept = (concept: TacticalConcept) => {
    if (!exercise.tactical_concepts?.includes(concept)) {
      onChange({
        ...exercise,
        tactical_concepts: [...(exercise.tactical_concepts || []), concept]
      })
    }
  }

  const handleRemoveConcept = (conceptToRemove: TacticalConcept) => {
    onChange({
      ...exercise,
      tactical_concepts: exercise.tactical_concepts?.filter(
        concept => concept !== conceptToRemove
      ) || []
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-1 space-y-2">
          <Label>Concepts tactiques</Label>
          <Select
            value=""
            onValueChange={(value: TacticalConcept) => handleAddConcept(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Ajouter un concept tactique" />
            </SelectTrigger>
            <SelectContent>
              {tacticalConcepts.map(concept => (
                <SelectItem key={concept} value={concept}>
                  {getConceptLabel(concept)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {exercise.tactical_concepts?.map(concept => (
          <Badge
            key={concept}
            variant="outline"
            className="flex items-center gap-1"
          >
            <ChevronRight className="h-3 w-3" />
            {getConceptLabel(concept)}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => handleRemoveConcept(concept)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  )
}
