
import { Exercise, ExerciseSuccessCriteria } from "@/types/sequence"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Trophy, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface SuccessCriteriaFieldProps {
  exercise: Exercise
  onChange: (exercise: Exercise) => void
}

export const SuccessCriteriaField = ({ exercise, onChange }: SuccessCriteriaFieldProps) => {
  const handleAddCriteria = () => {
    const newCriteria: ExerciseSuccessCriteria = {
      id: crypto.randomUUID(),
      exercise_id: exercise.id,
      description: "",
      target_value: 0,
      unit: "" // Add the required unit property
    }

    onChange({
      ...exercise,
      success_criteria: [...(exercise.success_criteria || []), newCriteria]
    })
  }

  const handleUpdateCriteria = (updatedCriteria: ExerciseSuccessCriteria) => {
    onChange({
      ...exercise,
      success_criteria: exercise.success_criteria?.map(criteria =>
        criteria.id === updatedCriteria.id ? updatedCriteria : criteria
      )
    })
  }

  const handleRemoveCriteria = (criteriaId: string) => {
    onChange({
      ...exercise,
      success_criteria: exercise.success_criteria?.filter(
        criteria => criteria.id !== criteriaId
      )
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Critères de réussite</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddCriteria}
          className="gap-1"
        >
          <Plus className="h-4 w-4" />
          Ajouter un critère
        </Button>
      </div>

      <div className="space-y-4">
        {exercise.success_criteria?.map(criteria => (
          <div key={criteria.id} className="flex items-start gap-4 rounded-lg border p-4">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-muted-foreground" />
                <Input
                  value={criteria.description}
                  onChange={e =>
                    handleUpdateCriteria({
                      ...criteria,
                      description: e.target.value
                    })
                  }
                  placeholder="Description du critère"
                  className="flex-1"
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={criteria.target_value}
                    onChange={e =>
                      handleUpdateCriteria({
                        ...criteria,
                        target_value: Number(e.target.value)
                      })
                    }
                    className="w-24"
                  />
                  <Input
                    value={criteria.unit || ""}
                    onChange={e =>
                      handleUpdateCriteria({
                        ...criteria,
                        unit: e.target.value
                      })
                    }
                    placeholder="Unité"
                    className="w-24"
                  />
                </div>
                <Badge variant="outline">
                  Objectif : {criteria.target_value} {criteria.unit}
                </Badge>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveCriteria(criteria.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
