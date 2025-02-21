
import { Exercise } from "@/types/sequence"
import { ExerciseFormFieldsProps } from "./types/exercise-form"
import { BasicExerciseFields } from "./form-fields/BasicExerciseFields"
import { SituationFields } from "./form-fields/SituationFields"
import { VariationsFields } from "./form-fields/VariationsFields"

export const ExerciseFormFields = ({ exercise, onChange }: ExerciseFormFieldsProps) => {
  return (
    <div className="space-y-6">
      <BasicExerciseFields exercise={exercise} onChange={onChange} />
      <SituationFields exercise={exercise} onChange={onChange} />
      <VariationsFields exercise={exercise} onChange={onChange} />
    </div>
  )
}
