
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Edit, X } from "lucide-react"
import { Exercise } from "@/types/sequence"
import { useExerciseMutation } from "@/hooks/mutations/useExerciseMutation"
import { useExerciseDeleteMutation } from "@/hooks/mutations/useExerciseDeleteMutation"
import { useExercisesQuery } from "@/hooks/queries/useExercisesQuery"
import { useSequenceObjectivesQuery } from "@/hooks/queries/useSequenceObjectivesQuery"
import { ExerciseListItem } from "./ExerciseListItem"
import { ExerciseFormFields } from "./ExerciseFormFields"
import { ExerciseFormProps } from "./types/exercise-form"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

export const ExerciseForm = ({ sequenceId }: ExerciseFormProps) => {
  const { data: exercises = [] } = useExercisesQuery(sequenceId)
  const { data: objectives = [] } = useSequenceObjectivesQuery(sequenceId)
  const exerciseMutation = useExerciseMutation(sequenceId)
  const exerciseDeleteMutation = useExerciseDeleteMutation(sequenceId)

  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null)
  const [newExercise, setNewExercise] = useState<Exercise>({
    id: '',
    title: "",
    description: "",
    duration: 5,
    intensity_level: "medium",
    exercise_order: exercises.length + 1,
    activity_type: "exercise"
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
          id: '',
          title: "",
          description: "",
          duration: 5,
          intensity_level: "medium",
          exercise_order: exercises.length + 2,
          activity_type: "exercise"
        })
      }
    } catch (error: any) {
      console.error("Exercise mutation error:", error)
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
      id: '',
      title: "",
      description: "",
      duration: 5,
      intensity_level: "medium",
      exercise_order: exercises.length + 1,
      activity_type: "exercise"
    })
  }

  const handleCancelEdit = () => {
    setEditingExercise(null)
  }

  const getObjectiveTypeLabel = (type: string) => {
    switch (type) {
      case "apprentissage":
        return "Apprentissage"
      case "developpement":
        return "Développement"
      case "perfectionnement":
        return "Perfectionnement"
      default:
        return type
    }
  }

  return (
    <div className="space-y-6">
      {objectives.length > 0 && (
        <div className="rounded-lg border p-4">
          <h4 className="font-medium mb-2">Objectifs de la séquence</h4>
          <ScrollArea className="h-[100px]">
            <div className="space-y-2">
              {objectives.map((objective) => (
                <div key={objective.id} className="flex items-center gap-2">
                  {objective.is_priority && (
                    <Badge variant="secondary" className="shrink-0">
                      Prioritaire
                    </Badge>
                  )}
                  <span className="text-sm">{objective.description}</span>
                  <Badge variant="outline" className="ml-auto shrink-0">
                    {getObjectiveTypeLabel(objective.objective_type)}
                  </Badge>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      <div className="space-y-4">
        {exercises.map((exercise, index) => (
          <ExerciseListItem
            key={exercise.id || index}
            exercise={exercise}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
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

        <ExerciseFormFields
          exercise={editingExercise || newExercise}
          onChange={editingExercise ? setEditingExercise : setNewExercise}
        />

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
