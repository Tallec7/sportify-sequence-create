
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, X } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useExerciseMutation } from "@/hooks/mutations/useExerciseMutation"
import { useExerciseDeleteMutation } from "@/hooks/mutations/useExerciseDeleteMutation"
import { useExercisesQuery } from "@/hooks/queries/useExercisesQuery"

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
}

export const ExerciseForm = ({ sequenceId }: ExerciseFormProps) => {
  const { data: exercises = [] } = useExercisesQuery(sequenceId)
  const exerciseMutation = useExerciseMutation(sequenceId)
  const exerciseDeleteMutation = useExerciseDeleteMutation(sequenceId)

  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null)
  const [newExercise, setNewExercise] = useState<Exercise>({
    title: "",
    description: "",
    duration: 5,
    intensity_level: "medium",
    exercise_order: exercises.length + 1
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingExercise) {
        await exerciseMutation.mutateAsync({
          ...editingExercise,
          id: editingExercise.id
        })
        setEditingExercise(null)
      } else {
        await exerciseMutation.mutateAsync(newExercise)
        setNewExercise({
          title: "",
          description: "",
          duration: 5,
          intensity_level: "medium",
          exercise_order: exercises.length + 2,
        })
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message,
      })
    }
  }

  const handleDelete = async (exerciseId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet exercice ?")) {
      await exerciseDeleteMutation.mutateAsync(exerciseId)
    }
  }

  const handleEdit = (exercise: Exercise) => {
    setEditingExercise(exercise)
    setNewExercise({
      title: "",
      description: "",
      duration: 5,
      intensity_level: "medium",
      exercise_order: exercises.length + 1,
    })
  }

  const handleCancelEdit = () => {
    setEditingExercise(null)
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
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => handleEdit(exercise)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => exercise.id && handleDelete(exercise.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">
            {editingExercise ? "Modifier l'exercice" : "Nouvel exercice"}
          </h4>
          {editingExercise && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleCancelEdit}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              value={editingExercise?.title || newExercise.title}
              onChange={(e) =>
                editingExercise
                  ? setEditingExercise({ ...editingExercise, title: e.target.value })
                  : setNewExercise({ ...newExercise, title: e.target.value })
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
              value={editingExercise?.duration || newExercise.duration}
              onChange={(e) =>
                editingExercise
                  ? setEditingExercise({
                      ...editingExercise,
                      duration: parseInt(e.target.value) || 0,
                    })
                  : setNewExercise({
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
            value={editingExercise?.description || newExercise.description}
            onChange={(e) =>
              editingExercise
                ? setEditingExercise({ ...editingExercise, description: e.target.value })
                : setNewExercise({ ...newExercise, description: e.target.value })
            }
            className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="intensity_level">Niveau d'intensité</Label>
          <Select
            value={editingExercise?.intensity_level || newExercise.intensity_level}
            onValueChange={(value) =>
              editingExercise
                ? setEditingExercise({ ...editingExercise, intensity_level: value })
                : setNewExercise({ ...newExercise, intensity_level: value })
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
            {editingExercise ? (
              <>
                <Edit className="h-4 w-4" />
                Modifier l'exercice
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Ajouter l'exercice
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
