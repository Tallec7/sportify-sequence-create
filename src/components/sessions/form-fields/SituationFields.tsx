
import { Exercise } from "@/types/sequence"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

interface SituationFieldsProps {
  exercise: Exercise
  onChange: (exercise: Exercise) => void
}

export const SituationFields = ({ exercise, onChange }: SituationFieldsProps) => {
  const handleDecisionMakingFocusChange = (focus: string) => {
    const currentFocus = exercise.decision_making_focus || []
    const updatedFocus = currentFocus.includes(focus)
      ? currentFocus.filter(f => f !== focus)
      : [...currentFocus, focus]
    onChange({ ...exercise, decision_making_focus: updatedFocus })
  }

  const handleTacticalObjectivesChange = (objective: string) => {
    const currentObjectives = exercise.tactical_objectives || []
    const updatedObjectives = currentObjectives.includes(objective)
      ? currentObjectives.filter(o => o !== objective)
      : [...currentObjectives, objective]
    onChange({ ...exercise, tactical_objectives: updatedObjectives })
  }

  if (exercise.activity_type !== 'situation') return null

  return (
    <>
      <Separator />
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="opposition_type">Type d'opposition</Label>
          <Select
            value={exercise.opposition_type}
            onValueChange={(value) =>
              onChange({ ...exercise, opposition_type: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un type d'opposition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Sans opposition</SelectItem>
              <SelectItem value="passive">Opposition passive</SelectItem>
              <SelectItem value="active">Opposition active</SelectItem>
              <SelectItem value="match">Situation de match</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>Focus sur la prise de décision</Label>
          <div className="flex flex-wrap gap-2">
            {["Lecture du jeu", "Prise d'information", "Choix tactiques", "Timing"].map((focus) => (
              <Button
                key={focus}
                type="button"
                variant={exercise.decision_making_focus?.includes(focus) ? "default" : "outline"}
                onClick={() => handleDecisionMakingFocusChange(focus)}
                size="sm"
              >
                {focus}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Label>Objectifs tactiques</Label>
          <div className="flex flex-wrap gap-2">
            {["Conservation", "Progression", "Finition", "Transition", "Organisation défensive"].map((objective) => (
              <Button
                key={objective}
                type="button"
                variant={exercise.tactical_objectives?.includes(objective) ? "default" : "outline"}
                onClick={() => handleTacticalObjectivesChange(objective)}
                size="sm"
              >
                {objective}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
