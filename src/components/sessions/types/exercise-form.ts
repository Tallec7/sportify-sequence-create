
import { Exercise } from "@/types/sequence"
import { SessionFormData } from "@/types/settings"

export interface ExerciseFormProps {
  onSave: (exercise: Exercise) => void
  sessionData: SessionFormData
  onCancel: () => void
  initialData?: Exercise
}

export interface ExerciseListItemProps {
  exercise: Exercise
  onEdit: (exercise: Exercise) => void
  onDelete: (exerciseId: string) => void
  sessionData?: SessionFormData
}

export interface ExerciseFormFieldsProps {
  exercise: Exercise
  onChange: (updatedExercise: Exercise) => void
}
