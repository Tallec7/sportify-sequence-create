
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import { ExerciseListItemProps } from "./types/exercise-form"

export const ExerciseListItem = ({ exercise, onEdit, onDelete }: ExerciseListItemProps) => {
  return (
    <div className="flex items-start gap-4 rounded-lg border p-4">
      <div className="flex-1 space-y-2">
        <h4 className="font-medium">{exercise.title}</h4>
        <div className="flex gap-2 text-sm text-muted-foreground">
          <span>{exercise.duration} min</span>
          <span>•</span>
          <span className="capitalize">{exercise.intensity_level}</span>
        </div>
        {exercise.description && (
          <p className="text-sm text-muted-foreground">
            {exercise.description}
          </p>
        )}
        {exercise.variations && exercise.variations.length > 0 && (
          <div className="space-y-1">
            <p className="text-sm font-medium">Variations :</p>
            <ul className="list-inside list-disc text-sm text-muted-foreground">
              {exercise.variations.map((variation, index) => (
                <li key={index}>{variation}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => onEdit(exercise)}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => exercise.id && onDelete(exercise.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
