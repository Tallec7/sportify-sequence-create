
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export const ExerciseForm = ({ sequenceId }: ExerciseFormProps) => {
  const { data: exercises = [] } = useExercisesQuery(sequenceId)
  const { data: objectives = [] } = useSequenceObjectivesQuery(sequenceId)
  const exerciseMutation = useExerciseMutation(sequenceId)
  const exerciseDeleteMutation = useExerciseDeleteMutation(sequenceId)

  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null)
  const [activityFilter, setActivityFilter] = useState<string>("all")
  const [newExercise, setNewExercise] = useState<Exercise>({
    id: '',
    title: "",
    description: "",
    duration: 5,
    intensity_level: "medium",
    exercise_order: exercises.length + 1,
    activity_type: "exercise"
  })

  const filteredExercises = exercises.filter(exercise => {
    if (activityFilter === "all") return true
    return exercise.activity_type === activityFilter
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
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <Label>Filtrer par type d'activité</Label>
            <Select
              value={activityFilter}
              onValueChange={setActivityFilter}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Tous les types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="exercise">Exercices</SelectItem>
                <SelectItem value="situation">Situations</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredExercises.map((exercise, index) => (
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
