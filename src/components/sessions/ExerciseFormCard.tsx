
import { Exercise } from "@/types/sequence"
import { Button } from "@/components/ui/button"
import { Plus, Edit, X } from "lucide-react"
import { ExerciseFormFields } from "./ExerciseFormFields"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
        <form onSubmit={onSubmit} className="space-y-4">
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
