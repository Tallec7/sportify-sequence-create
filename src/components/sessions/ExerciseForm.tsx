
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { supabase } from "@/integrations/supabase/client"

export interface Exercise {
  id?: string
  title: string
  description: string
  duration: number
  intensity_level: string
  coach_instructions?: string
  player_instructions?: string
  setup_instructions?: string
  exercise_order: number
  sequence_id?: string
}

interface ExerciseFormProps {
  sequenceId: string
  exercises: Exercise[]
  onExerciseAdded: (exercise: Exercise) => void
}

export const ExerciseForm = ({ sequenceId, exercises, onExerciseAdded }: ExerciseFormProps) => {
  const [newExercise, setNewExercise] = useState<Exercise>({
    title: "",
    description: "",
    duration: 5,
    intensity_level: "medium",
    exercise_order: exercises.length + 1,
    sequence_id: sequenceId,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data: exercise, error } = await supabase
        .from("exercises")
        .insert([{ ...newExercise, sequence_id: sequenceId }])
        .select()
        .single()

      if (error) throw error

      onExerciseAdded(exercise)
      toast({
        title: "Succès",
        description: "L'exercice a été ajouté avec succès.",
      })

      setNewExercise({
        title: "",
        description: "",
        duration: 5,
        intensity_level: "medium",
        exercise_order: exercises.length + 2,
        sequence_id: sequenceId,
      })
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message,
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {exercises.map((exercise, index) => (
          <div
            key={exercise.id || index}
            className="flex items-center gap-4 rounded-lg border p-4"
          >
            <div className="flex-1 space-y-1">
              <h4 className="font-medium">{exercise.title}</h4>
              <div className="flex gap-2 text-sm text-muted-foreground">
                <span>{exercise.duration} min</span>
                <span>•</span>
                <span className="capitalize">{exercise.intensity_level}</span>
              </div>
              {exercise.description && (
                <p className="text-sm text-muted-foreground">
                  {exercise.description}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border p-4">
        <h4 className="font-medium">Nouvel exercice</h4>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              value={newExercise.title}
              onChange={(e) =>
                setNewExercise({ ...newExercise, title: e.target.value })
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
              value={newExercise.duration}
              onChange={(e) =>
                setNewExercise({
                  ...newExercise,
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
            value={newExercise.description}
            onChange={(e) =>
              setNewExercise({ ...newExercise, description: e.target.value })
            }
            className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="intensity_level">Niveau d'intensité</Label>
          <Select
            value={newExercise.intensity_level}
            onValueChange={(value) =>
              setNewExercise({ ...newExercise, intensity_level: value })
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
        <div className="flex justify-end">
          <Button type="submit" className="gap-2">
            <Plus className="h-4 w-4" />
            Ajouter l'exercice
          </Button>
        </div>
      </form>
    </div>
  )
}
