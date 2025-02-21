
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Activity, List } from "lucide-react"
import { ExerciseListItemProps } from "./types/exercise-form"

export const ExerciseListItem = ({ exercise, onEdit, onDelete }: ExerciseListItemProps) => {
  const getActivityIcon = () => {
    return exercise.activity_type === 'exercise' ? (
      <List className="h-4 w-4" />
    ) : (
      <Activity className="h-4 w-4" />
    )
  }

  return (
    <div className="flex items-start gap-4 rounded-lg border p-4">
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <h4 className="font-medium">{exercise.title}</h4>
          <Badge 
            variant={exercise.activity_type === 'exercise' ? "outline" : "default"}
            className="flex items-center gap-1"
          >
            {getActivityIcon()}
            <span className="capitalize">
              {exercise.activity_type === 'exercise' ? 'Exercice' : 'Situation'}
            </span>
          </Badge>
        </div>
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
        
        <div className="grid gap-4 md:grid-cols-2 mt-4">
          {exercise.diagram_url && (
            <div className="space-y-1">
              <p className="text-sm font-medium">Diagramme :</p>
              <img 
                src={exercise.diagram_url} 
                alt="Diagramme de l'exercice" 
                className="rounded-md max-h-40 object-cover"
              />
            </div>
          )}
          {exercise.video_url && (
            <div className="space-y-1">
              <p className="text-sm font-medium">Vidéo :</p>
              <video 
                src={exercise.video_url} 
                className="rounded-md max-h-40 w-full" 
                controls
              />
            </div>
          )}
        </div>

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
