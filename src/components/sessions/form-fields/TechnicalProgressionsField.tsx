
import { Exercise, TechnicalProgression } from "@/types/sequence"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, ChartBar, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface TechnicalProgressionsFieldProps {
  exercise: Exercise
  onChange: (exercise: Exercise) => void
}

export const TechnicalProgressionsField = ({ exercise, onChange }: TechnicalProgressionsFieldProps) => {
  const handleAddProgression = () => {
    const newProgression: TechnicalProgression = {
      id: crypto.randomUUID(),
      exercise_id: exercise.id,
      skill_name: "",
      current_level: 1,
      target_level: 2
    }

    onChange({
      ...exercise,
      technical_progressions: [...(exercise.technical_progressions || []), newProgression]
    })
  }

  const handleUpdateProgression = (updatedProgression: TechnicalProgression) => {
    onChange({
      ...exercise,
      technical_progressions: exercise.technical_progressions?.map(progression =>
        progression.id === updatedProgression.id ? updatedProgression : progression
      )
    })
  }

  const handleRemoveProgression = (progressionId: string) => {
    onChange({
      ...exercise,
      technical_progressions: exercise.technical_progressions?.filter(
        progression => progression.id !== progressionId
      )
    })
  }

  const levelOptions = Array.from({ length: 5 }, (_, i) => i + 1)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Progressions techniques</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddProgression}
          className="gap-1"
        >
          <Plus className="h-4 w-4" />
          Ajouter une progression
        </Button>
      </div>

      <div className="space-y-4">
        {exercise.technical_progressions?.map(progression => (
          <div key={progression.id} className="flex items-start gap-4 rounded-lg border p-4">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2">
                <ChartBar className="h-4 w-4 text-muted-foreground" />
                <Input
                  value={progression.skill_name}
                  onChange={e =>
                    handleUpdateProgression({
                      ...progression,
                      skill_name: e.target.value
                    })
                  }
                  placeholder="Nom de la compétence"
                  className="flex-1"
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="space-y-2">
                    <Label>Niveau actuel</Label>
                    <Select
                      value={progression.current_level.toString()}
                      onValueChange={value =>
                        handleUpdateProgression({
                          ...progression,
                          current_level: Number(value)
                        })
                      }
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {levelOptions.map(level => (
                          <SelectItem key={level} value={level.toString()}>
                            Niveau {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Niveau cible</Label>
                    <Select
                      value={progression.target_level?.toString()}
                      onValueChange={value =>
                        handleUpdateProgression({
                          ...progression,
                          target_level: Number(value)
                        })
                      }
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {levelOptions.map(level => (
                          <SelectItem key={level} value={level.toString()}>
                            Niveau {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Badge variant="outline">
                  Progression : {progression.current_level} → {progression.target_level}
                </Badge>
              </div>
              {progression.progression_notes && (
                <Input
                  value={progression.progression_notes}
                  onChange={e =>
                    handleUpdateProgression({
                      ...progression,
                      progression_notes: e.target.value
                    })
                  }
                  placeholder="Notes de progression"
                  className="flex-1"
                />
              )}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveProgression(progression.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
