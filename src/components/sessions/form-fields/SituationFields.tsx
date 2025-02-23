
import { Exercise } from "@/types/sequence"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SituationFieldsProps {
  exercise: Exercise
  onChange: (exercise: Exercise) => void
}

type OppositionType = "none" | "passive" | "active" | "match"

export const SituationFields = ({ exercise, onChange }: SituationFieldsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Opposition</Label>
        <Select
          value={exercise.opposition_type || "none"}
          onValueChange={(value: OppositionType) =>
            onChange({
              ...exercise,
              opposition_type: value
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Type d'opposition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Sans opposition</SelectItem>
            <SelectItem value="passive">Opposition passive</SelectItem>
            <SelectItem value="active">Opposition active</SelectItem>
            <SelectItem value="match">Match</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Instructions des joueurs</Label>
        <Textarea
          value={exercise.player_instructions || ""}
          onChange={(e) =>
            onChange({
              ...exercise,
              player_instructions: e.target.value
            })
          }
          placeholder="Instructions spécifiques pour les joueurs..."
        />
      </div>

      <div className="space-y-2">
        <Label>Instructions du coach</Label>
        <Textarea
          value={exercise.coach_instructions || ""}
          onChange={(e) =>
            onChange({
              ...exercise,
              coach_instructions: e.target.value
            })
          }
          placeholder="Instructions spécifiques pour le coach..."
        />
      </div>
    </div>
  )
}
