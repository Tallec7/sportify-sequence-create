
import { Exercise } from "@/types/sequence"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MediaUploadField } from "./MediaUploadField"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface BasicExerciseFieldsProps {
  exercise: Exercise
  onChange: (exercise: Exercise) => void
}

export const BasicExerciseFields = ({ exercise, onChange }: BasicExerciseFieldsProps) => {
  return (
    <div className="space-y-6">
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

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="activity_type">Type d'activité</Label>
          <Select
            value={exercise.activity_type}
            onValueChange={(value: 'exercise' | 'situation') =>
              onChange({ ...exercise, activity_type: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un type d'activité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="exercise">Exercice</SelectItem>
              <SelectItem value="situation">Situation</SelectItem>
            </SelectContent>
          </Select>
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
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <MediaUploadField
          label="Diagramme"
          accept="image/*"
          value={exercise.diagram_url}
          onChange={(url) => onChange({ ...exercise, diagram_url: url })}
        />
        <MediaUploadField
          label="Vidéo"
          accept="video/*"
          value={exercise.video_url}
          onChange={(url) => onChange({ ...exercise, video_url: url })}
        />
      </div>
    </div>
  )
}
