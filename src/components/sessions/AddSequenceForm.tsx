
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Sequence } from "@/types/sequence"
import { useSequenceTypesQuery } from "@/hooks/queries/useSequenceTypesQuery"
import { useIntensityLevelsQuery } from "@/hooks/queries/useIntensityLevelsQuery"

interface AddSequenceFormProps {
  newSequence: Sequence
  setNewSequence: (sequence: Sequence) => void
  onSubmit: (e: React.FormEvent) => Promise<void>
}

export const AddSequenceForm = ({
  newSequence,
  setNewSequence,
  onSubmit,
}: AddSequenceFormProps) => {
  const { data: sequenceTypes = [] } = useSequenceTypesQuery()
  const { data: intensityLevels = [] } = useIntensityLevelsQuery()

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Titre</Label>
          <Input
            id="title"
            value={newSequence.title}
            onChange={(e) =>
              setNewSequence({ ...newSequence, title: e.target.value })
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sequence_type">Type de séquence</Label>
          <Select
            value={newSequence.sequence_type}
            onValueChange={(value: "warmup" | "main" | "cooldown") =>
              setNewSequence({ ...newSequence, sequence_type: value })
            }
            required
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
          <Label htmlFor="duration">Durée (minutes)</Label>
          <Input
            id="duration"
            type="number"
            min="1"
            value={newSequence.duration}
            onChange={(e) =>
              setNewSequence({
                ...newSequence,
                duration: parseInt(e.target.value) || 0,
              })
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="intensity_level">Niveau d'intensité</Label>
          <Select
            value={newSequence.intensity_level}
            onValueChange={(value: "low" | "medium" | "high") =>
              setNewSequence({ ...newSequence, intensity_level: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une intensité" />
            </SelectTrigger>
            <SelectContent>
              {intensityLevels.map((level) => (
                <SelectItem key={level.id} value={level.value as "low" | "medium" | "high"}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          value={newSequence.description}
          onChange={(e) =>
            setNewSequence({ ...newSequence, description: e.target.value })
          }
          className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
        />
      </div>
      <div>
        <Button type="submit" className="gap-2">
          <Plus className="h-4 w-4" />
          Ajouter la séquence
        </Button>
      </div>
    </form>
  )
}
