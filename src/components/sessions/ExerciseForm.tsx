
import React, { useState, useCallback } from "react"
import { Exercise } from "@/types/sequence"
import { useExerciseMutation } from "@/hooks/mutations/useExerciseMutation"
import { useExerciseDeleteMutation } from "@/hooks/mutations/useExerciseDeleteMutation"
import { useExercisesQuery } from "@/hooks/queries/useExercisesQuery"
import { useSequenceObjectivesQuery } from "@/hooks/queries/useSequenceObjectivesQuery"
import { useSessionQuery } from "@/hooks/queries/useSessionQuery"
import { ExerciseListItem } from "./ExerciseListItem"
import { ExerciseFormCard } from "./ExerciseFormCard"
import { ExerciseObjectivesList } from "./ExerciseObjectivesList"
import { ExerciseFormProps } from "./types/exercise-form"
import { Reorder, AnimatePresence } from "framer-motion"
import { useExerciseOrderMutation } from "@/hooks/mutations/useExerciseOrderMutation"
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
  const exerciseOrderMutation = useExerciseOrderMutation(sequenceId)
  const [localExercises, setLocalExercises] = useState(exercises)

  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null)
  const [activityFilter, setActivityFilter] = useState<string>("all")
  const [newExercise, setNewExercise] = useState<Exercise>({
    id: '',
    title: "",
    description: "",
    duration: 5,
    intensity_level: "medium",
    exercise_order: exercises.length + 1,
    activity_type: "exercise",
    objective: "À définir"
  })

  const { data: session } = useSessionQuery({})  // Pass empty object as argument
  const sessionContext = session ? {
    sport: session.sport,
    level: session.level,
    age_category: session.age_category,
    intensity_level: session.intensity_level ?? "medium"
  } : undefined

  React.useEffect(() => {
    setLocalExercises(exercises)
  }, [exercises])

  const filteredExercises = localExercises.filter(exercise => {
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
        activity_type: "exercise",
        objective: "À définir"
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
      activity_type: "exercise",
      objective: "À définir"
    })
  }

  const handleCancelEdit = () => {
    setEditingExercise(null)
  }

  const debouncedUpdateOrder = useCallback(
    async (reorderedExercises: Exercise[]) => {
      setLocalExercises(reorderedExercises)
      exerciseOrderMutation.mutate(reorderedExercises)
    },
    [exerciseOrderMutation]
  )

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

        <Reorder.Group 
          axis="y" 
          values={filteredExercises} 
          onReorder={debouncedUpdateOrder}
        >
          <AnimatePresence mode="popLayout">
            {filteredExercises.map((exercise) => (
              <Reorder.Item
                key={exercise.id}
                value={exercise}
                className="touch-none cursor-move"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <ExerciseListItem
                  exercise={exercise}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  sessionContext={sessionContext}
                />
              </Reorder.Item>
            ))}
          </AnimatePresence>
        </Reorder.Group>
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
