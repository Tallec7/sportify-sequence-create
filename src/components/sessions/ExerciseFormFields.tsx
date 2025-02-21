
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Plus, X } from "lucide-react"
import { ExerciseFormFieldsProps } from "./types/exercise-form"

export const ExerciseFormFields = ({ exercise, onChange }: ExerciseFormFieldsProps) => {
  const handleVariationChange = (index: number, value: string) => {
    const newVariations = [...(exercise.variations || [])]
    newVariations[index] = value
    onChange({ ...exercise, variations: newVariations })
  }

  const addVariation = () => {
    const newVariations = [...(exercise.variations || []), ""]
    onChange({ ...exercise, variations: newVariations })
  }

  const removeVariation = (index: number) => {
    const newVariations = (exercise.variations || []).filter((_, i) => i !== index)
    onChange({ ...exercise, variations: newVariations })
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Titre</Label>
          <Input
            id="title"
            value={exercise.title}
            onChange={(e) =>
              onChange({ ...exercise, title: e.target.value })
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration">Durée (minutes)</Label>
          <Input
            id="duration"
            type="number"
            min="1"
            value={exercise.duration}
            onChange={(e) =>
              onChange({
                ...exercise,
                duration: parseInt(e.target.value) || 0,
              })
            }
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          value={exercise.description}
          onChange={(e) =>
            onChange({ ...exercise, description: e.target.value })
          }
          className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="intensity_level">Niveau d'intensité</Label>
        <Select
          value={exercise.intensity_level}
          onValueChange={(value) =>
            onChange({ ...exercise, intensity_level: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner une intensité" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Faible</SelectItem>
            <SelectItem value="medium">Moyenne</SelectItem>
            <SelectItem value="high">Élevée</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Variations de l'exercice</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addVariation}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Ajouter une variation
          </Button>
        </div>
        <div className="space-y-2">
          {exercise.variations?.map((variation, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={variation}
                onChange={(e) => handleVariationChange(index, e.target.value)}
                placeholder={`Variation ${index + 1}`}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeVariation(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
