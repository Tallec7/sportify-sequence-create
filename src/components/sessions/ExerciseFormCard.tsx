
import { Exercise } from "@/types/sequence"
import { Button } from "@/components/ui/button"
import { Plus, Edit, X } from "lucide-react"
import { ExerciseFormFields } from "./ExerciseFormFields"
import { ExerciseTemplateSelector } from "./ExerciseTemplateSelector"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface ExerciseFormCardProps {
  editingExercise: Exercise | null
  exercise: Exercise
  onSubmit: (e: React.FormEvent) => Promise<void>
  onChange: (exercise: Exercise) => void
  onCancelEdit: () => void
}

export const ExerciseFormCard = ({
  editingExercise,
  exercise,
  onSubmit,
  onChange,
  onCancelEdit,
}: ExerciseFormCardProps) => {
  const handleTemplateSelect = (template: Partial<Exercise>) => {
    onChange({
      ...exercise,
      ...template,
      id: exercise.id,
      exercise_order: exercise.exercise_order
    })
  }

  return (
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
              onClick={onCancelEdit}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          {!editingExercise && (
            <>
              <ExerciseTemplateSelector
                activityType={exercise.activity_type}
                onSelectTemplate={handleTemplateSelect}
              />
              <Separator />
            </>
          )}

          <ExerciseFormFields
            exercise={editingExercise || exercise}
            onChange={onChange}
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
  )
}

