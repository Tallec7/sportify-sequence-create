
import { Exercise } from "@/types/sequence"
import { ExerciseFormFieldsProps } from "./types/exercise-form"
import { BasicExerciseFields } from "./form-fields/BasicExerciseFields"
import { SituationFields } from "./form-fields/SituationFields"
import { VariationsFields } from "./form-fields/VariationsFields"
import { TacticalConceptsField } from "./form-fields/TacticalConceptsField"
import { SuccessCriteriaField } from "./form-fields/SuccessCriteriaField"
import { TechnicalProgressionsField } from "./form-fields/TechnicalProgressionsField"
import { Separator } from "@/components/ui/separator"

export const ExerciseFormFields = ({ exercise, onChange }: ExerciseFormFieldsProps) => {
  return (
    <div className="space-y-6">
      <BasicExerciseFields exercise={exercise} onChange={onChange} />
      
      <Separator />
      
      <TacticalConceptsField exercise={exercise} onChange={onChange} />
      
      <Separator />
      
      {exercise.activity_type === "situation" && (
        <>
          <SituationFields exercise={exercise} onChange={onChange} />
          <Separator />
        </>
      )}
      
      <SuccessCriteriaField exercise={exercise} onChange={onChange} />
      
      <Separator />
      
      <TechnicalProgressionsField exercise={exercise} onChange={onChange} />
      
      <Separator />
      
      <VariationsFields exercise={exercise} onChange={onChange} />
    </div>
  )
}
