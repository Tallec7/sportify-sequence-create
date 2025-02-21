
import { Exercise } from "@/types/sequence"

export interface ExerciseFormProps {
  sequenceId: string
}

export interface ExerciseListItemProps {
  exercise: Exercise
  onEdit: (exercise: Exercise) => void
  onDelete: (exerciseId: string) => void
}

export interface ExerciseFormFieldsProps {
  exercise: Exercise
  onChange: (updatedExercise: Exercise) => void
}
