
import { Button } from "@/components/ui/button"
import { Sequence } from "@/types/sequence"
import { ExerciseForm } from "./ExerciseForm"

interface SequenceListProps {
  sequences: Sequence[]
  selectedSequenceId: string | null
  setSelectedSequenceId: (id: string | null) => void
  onReorder: (sequences: Sequence[]) => void
}

export const SequenceList = ({
  sequences,
  selectedSequenceId,
  setSelectedSequenceId,
  onReorder,
}: SequenceListProps) => {
  return (
    <div className="space-y-6">
      {sequences.map((sequence, index) => (
        <div
          key={sequence.id || index}
          className="rounded-lg border bg-background p-6"
        >
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{sequence.title}</h3>
                <div className="flex gap-2 text-sm text-muted-foreground">
                  <span>{sequence.duration} min</span>
                  <span>•</span>
                  <span className="capitalize">{sequence.sequence_type}</span>
                  <span>•</span>
                  <span className="capitalize">
                    Intensité {sequence.intensity_level}
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() =>
                  setSelectedSequenceId(
                    selectedSequenceId === sequence.id ? null : sequence.id
                  )
                }
              >
                {selectedSequenceId === sequence.id
                  ? "Masquer les exercices"
                  : "Voir les exercices"}
              </Button>
            </div>
            {sequence.description && (
              <p className="mt-2 text-sm text-muted-foreground">
                {sequence.description}
              </p>
            )}
          </div>
          {selectedSequenceId === sequence.id && sequence.id && (
            <ExerciseForm sequenceId={sequence.id} />
          )}
        </div>
      ))}
    </div>
  )
}
