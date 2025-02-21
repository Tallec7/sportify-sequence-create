
import { Badge } from "@/components/ui/badge"
import { Sequence } from "@/types/sequence"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ViewSessionSequencesProps {
  sequences: Sequence[]
}

export const ViewSessionSequences = ({ sequences }: ViewSessionSequencesProps) => {
  const getSequenceTypeLabel = (type: string) => {
    switch (type) {
      case "warmup":
        return "Échauffement"
      case "main":
        return "Principal"
      case "cooldown":
        return "Retour au calme"
      default:
        return type
    }
  }

  const getIntensityLabel = (level: string) => {
    switch (level) {
      case "low":
        return "Faible"
      case "medium":
        return "Moyenne"
      case "high":
        return "Élevée"
      default:
        return level
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Séquences</h2>
      <div className="grid gap-4">
        {sequences.map((sequence: Sequence) => (
          <div key={sequence.id} className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{sequence.title}</h3>
              <Badge variant="secondary">
                {getSequenceTypeLabel(sequence.sequence_type)}
              </Badge>
            </div>
            
            <p className="text-muted-foreground">{sequence.description}</p>
            
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>Durée: {sequence.duration}min</span>
              <span>Intensité: {getIntensityLabel(sequence.intensity_level)}</span>
            </div>

            {sequence.exercises && sequence.exercises.length > 0 && (
              <div className="space-y-3 pt-3">
                <h4 className="font-medium text-sm">Exercices</h4>
                <ScrollArea className="h-[250px] rounded-md border p-4">
                  <div className="space-y-4">
                    {sequence.exercises
                      .sort((a, b) => a.exercise_order - b.exercise_order)
                      .map((exercise) => (
                        <div key={exercise.id} className="space-y-2 pb-3 border-b last:border-0">
                          <h5 className="font-medium text-sm">{exercise.title}</h5>
                          <p className="text-sm text-muted-foreground">{exercise.description}</p>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <span>Durée: {exercise.duration}min</span>
                            {exercise.intensity_level && (
                              <span>Intensité: {getIntensityLabel(exercise.intensity_level)}</span>
                            )}
                          </div>
                          {(exercise.player_instructions || exercise.setup_instructions || exercise.coach_instructions) && (
                            <div className="grid gap-2 text-sm pt-2">
                              {exercise.player_instructions && (
                                <div>
                                  <span className="font-medium">Instructions joueurs:</span>
                                  <p className="text-muted-foreground">{exercise.player_instructions}</p>
                                </div>
                              )}
                              {exercise.setup_instructions && (
                                <div>
                                  <span className="font-medium">Instructions installation:</span>
                                  <p className="text-muted-foreground">{exercise.setup_instructions}</p>
                                </div>
                              )}
                              {exercise.coach_instructions && (
                                <div>
                                  <span className="font-medium">Instructions coach:</span>
                                  <p className="text-muted-foreground">{exercise.coach_instructions}</p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
