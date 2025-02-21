
import { Badge } from "@/components/ui/badge"
import { Sequence } from "@/types/sequence"

interface ViewSessionSequencesProps {
  sequences: Sequence[]
}

export const ViewSessionSequences = ({ sequences }: ViewSessionSequencesProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Séquences</h2>
      <div className="grid gap-4">
        {sequences.map((sequence: Sequence) => (
          <div key={sequence.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{sequence.title}</h3>
              <Badge>
                {sequence.sequence_type === "warmup" ? "Échauffement"
                  : sequence.sequence_type === "main" ? "Principal"
                  : "Retour au calme"}
              </Badge>
            </div>
            <p className="text-muted-foreground mb-2">{sequence.description}</p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>Durée: {sequence.duration}min</span>
              <span>Intensité: {
                sequence.intensity_level === "low" ? "Faible"
                  : sequence.intensity_level === "medium" ? "Moyenne"
                  : "Élevée"
              }</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
