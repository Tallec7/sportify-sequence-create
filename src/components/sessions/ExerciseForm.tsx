
import React, { useState } from "react"
import { Exercise } from "@/types/sequence"
import { useExerciseMutation } from "@/hooks/mutations/useExerciseMutation"
import { useExerciseDeleteMutation } from "@/hooks/mutations/useExerciseDeleteMutation"
import { useExercisesQuery } from "@/hooks/queries/useExercisesQuery"
import { useSequenceObjectivesQuery } from "@/hooks/queries/useSequenceObjectivesQuery"
import { ExerciseListItem } from "./ExerciseListItem"
import { ExerciseFormCard } from "./ExerciseFormCard"
import { ExerciseObjectivesList } from "./ExerciseObjectivesList"
import { ExerciseFormProps } from "./types/exercise-form"

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

  return (
    <div className="space-y-6">
      <ExerciseObjectivesList objectives={objectives} />

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

      <ExerciseFormCard
        editingExercise={editingExercise}
        exercise={editingExercise || newExercise}
        onSubmit={handleSubmit}
        onChange={editingExercise ? setEditingExercise : setNewExercise}
        onCancelEdit={handleCancelEdit}
      />
    </div>
  )
}
