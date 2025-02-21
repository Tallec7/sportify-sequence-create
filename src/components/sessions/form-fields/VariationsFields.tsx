
import { Exercise } from "@/types/sequence"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, X } from "lucide-react"

interface VariationsFieldsProps {
  exercise: Exercise
  onChange: (exercise: Exercise) => void
}

export const VariationsFields = ({ exercise, onChange }: VariationsFieldsProps) => {
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
  )
}
