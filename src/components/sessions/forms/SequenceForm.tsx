import { FormEvent, useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSequenceTypesQuery } from "@/hooks/queries/useSequenceTypesQuery"
import { useIntensityLevelsQuery } from "@/hooks/queries/useIntensityLevelsQuery"
import type { Sequence } from "@/types/sequence"

interface SequenceFormProps {
  sequence?: Partial<Sequence>
  onSubmit: (sequence: Sequence) => void
}

export const SequenceForm = ({ sequence, onSubmit }: SequenceFormProps) => {
  const [formData, setFormData] = useState({
    title: sequence?.title || "",
    description: sequence?.description || "",
    sequence_type: sequence?.sequence_type || "",
    duration: sequence?.duration || 30,
    intensity_level: sequence?.intensity_level || "",
    objective: sequence?.objective || ""
  })

  const { data: sequenceTypes = [] } = useSequenceTypesQuery()
  const { data: intensityLevels = [] } = useIntensityLevelsQuery()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(formData as Sequence)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Titre</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="objective">Objectif</Label>
        <textarea
          id="objective"
          value={formData.objective}
          onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
          className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
          required
          placeholder="Définissez l'objectif principal de cette séquence..."
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="sequence_type">Type de séquence</Label>
          <Select
            value={formData.sequence_type}
            onValueChange={(value) =>
              setFormData({ ...formData, sequence_type: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un type" />
            </SelectTrigger>
            <SelectContent>
              {sequenceTypes.map((type) => (
                <SelectItem key={type.id} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="intensity_level">Niveau d'intensité</Label>
          <Select
            value={formData.intensity_level}
            onValueChange={(value) =>
              setFormData({ ...formData, intensity_level: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une intensité" />
            </SelectTrigger>
            <SelectContent>
              {intensityLevels.map((level) => (
                <SelectItem key={level.id} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Durée (minutes)</Label>
          <Input
            id="duration"
            type="number"
            min="1"
            value={formData.duration}
            onChange={(e) =>
              setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })
            }
            required
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md">
          {sequence ? "Modifier" : "Ajouter"}
        </button>
      </div>
    </form>
  )
}
