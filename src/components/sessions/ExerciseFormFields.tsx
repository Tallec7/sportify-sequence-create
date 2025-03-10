
import { Exercise } from "@/types/sequence"
import { ExerciseFormFieldsProps } from "./types/exercise-form"
import { BasicExerciseFields } from "./form-fields/BasicExerciseFields"
import { SituationFields } from "./form-fields/SituationFields"
import { VariationsFields } from "./form-fields/VariationsFields"
import { TacticalConceptsField } from "./form-fields/TacticalConceptsField"
import { SuccessCriteriaField } from "./form-fields/SuccessCriteriaField"
import { TechnicalProgressionsField } from "./form-fields/TechnicalProgressionsField"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useActivityTypesQuery } from "@/hooks/queries/useActivityTypesQuery"

export const ExerciseFormFields = ({ exercise, onChange }: ExerciseFormFieldsProps) => {
  const { data: activityTypes = [] } = useActivityTypesQuery()

  const handleActivityTypeChange = (value: string) => {
    // Only allow 'exercise' or 'situation' as valid types
    const validType = value === 'situation' ? 'situation' : 'exercise'
    onChange({ ...exercise, activity_type: validType })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Type d'activité</Label>
        <Select
          value={exercise.activity_type}
          onValueChange={handleActivityTypeChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un type" />
          </SelectTrigger>
          <SelectContent>
            {activityTypes.map((type) => (
              <SelectItem key={type.id} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

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
