
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Edit, X, Target } from "lucide-react"
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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

  const renderObjectivesByType = () => {
    const objectivesByType = objectives.reduce((acc, obj) => {
      if (!acc[obj.objective_type]) {
        acc[obj.objective_type] = []
      }
      acc[obj.objective_type].push(obj)
      return acc
    }, {} as Record<string, typeof objectives>)

    return Object.entries(objectivesByType).map(([type, objs]) => (
      <div key={type} className="space-y-2">
        <h5 className="text-sm font-medium text-muted-foreground">
          {getObjectiveTypeLabel(type)}
        </h5>
        {objs.map((obj) => (
          <div key={obj.id} className="flex items-center gap-2 bg-accent/50 rounded-lg p-2">
            {obj.is_priority && (
              <Target className="h-4 w-4 text-primary shrink-0" />
            )}
            <span className="text-sm">{obj.description}</span>
          </div>
        ))}
      </div>
    ))
  }

  return (
    <div className="space-y-6">
      {objectives.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Objectifs de la séquence</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px] pr-4">
              <div className="space-y-4">
                {renderObjectivesByType()}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
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

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              {editingExercise ? "Modifier l'exercice" : "Nouvel exercice"}
            </CardTitle>
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
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
        </CardContent>
      </Card>
    </div>
  )
}

