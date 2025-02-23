import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Activity, List, ChevronRight, Trophy, ChartBar, Sparkles } from "lucide-react"
import { ExerciseListItemProps } from "./types/exercise-form"
import { Exercise, TacticalConcept } from "@/types/sequence"
import { ExerciseAlternatives } from "./ExerciseAlternatives"

export const ExerciseListItem = ({ exercise, onEdit, onDelete, sessionContext }: ExerciseListItemProps & { sessionContext?: { sport: string; level: string; age_category: string; intensity_level: string } }) => {
  const [showAlternatives, setShowAlternatives] = useState(false)

  const handleSelectAlternative = (alternative: Exercise) => {
    onEdit({
      ...alternative,
      id: exercise.id,
      exercise_order: exercise.exercise_order
    })
    setShowAlternatives(false)
  }

  const getActivityIcon = () => {
    return exercise.activity_type === 'exercise' ? (
      <List className="h-4 w-4" />
    ) : (
      <Activity className="h-4 w-4" />
    )
  }

  const getConceptLabel = (concept: TacticalConcept) => {
    const labels: Record<TacticalConcept, string> = {
      montee_de_balle: "Montée de balle",
      repli_defensif: "Repli défensif",
      contre_attaque: "Contre-attaque",
      attaque_placee: "Attaque placée",
      defense_alignee: "Défense alignée",
      defense_etagee: "Défense étagée"
    }
    return labels[concept]
  }

  return (
    <div className="space-y-4">
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
          
          {exercise.tactical_concepts && exercise.tactical_concepts.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {exercise.tactical_concepts.map(concept => (
                <Badge
                  key={concept}
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  <ChevronRight className="h-3 w-3" />
                  {getConceptLabel(concept)}
                </Badge>
              ))}
            </div>
          )}

          {exercise.success_criteria && exercise.success_criteria.length > 0 && (
            <div className="space-y-2">
              <h5 className="text-sm font-medium flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Critères de réussite
              </h5>
              <div className="flex flex-wrap gap-2">
                {exercise.success_criteria.map(criteria => (
                  <Badge key={criteria.id} variant="outline">
                    {criteria.target_value} {criteria.unit} - {criteria.description}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {exercise.technical_progressions && exercise.technical_progressions.length > 0 && (
            <div className="space-y-2">
              <h5 className="text-sm font-medium flex items-center gap-2">
                <ChartBar className="h-4 w-4" />
                Progressions techniques
              </h5>
              <div className="flex flex-wrap gap-2">
                {exercise.technical_progressions.map(progression => (
                  <Badge key={progression.id} variant="outline">
                    {progression.skill_name}: {progression.current_level} → {progression.target_level}
                  </Badge>
                ))}
              </div>
            </div>
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
        {sessionContext && (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setShowAlternatives(!showAlternatives)}
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        )}
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

      {showAlternatives && sessionContext && (
        <div className="pl-4">
          <ExerciseAlternatives
            exercise={exercise}
            sessionContext={sessionContext}
            onSelectAlternative={handleSelectAlternative}
          />
        </div>
      )}
    </div>
  )
}
