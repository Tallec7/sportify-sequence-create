import { Button } from "@/components/ui/button"
import { Sequence } from "@/types/sequence"
import { ExerciseForm } from "./ExerciseForm"
import { Reorder, AnimatePresence } from "framer-motion"
import { Timeline } from "./Timeline"
import { Copy } from "lucide-react"
import { AgeCategoryType } from "@/types/settings"

export interface SequenceListProps {
  sequences: Sequence[]
  selectedSequenceId: string | null
  setSelectedSequenceId: (id: string | null) => void
  onReorder: (sequences: Sequence[]) => void
  onDuplicate?: (sequenceId: string) => void
  totalDuration: number
  sessionContext?: {
    sport: string
    level: string
    age_category: AgeCategoryType
    intensity_level: string
  }
}

export const SequenceList = ({
  sequences,
  selectedSequenceId,
  setSelectedSequenceId,
  onReorder,
  onDuplicate,
  totalDuration,
  sessionContext,
}: SequenceListProps) => {
  return (
    <div className="space-y-6 dark:bg-gray-900">
      <Timeline sequences={sequences} totalDuration={totalDuration} />
      
      <Reorder.Group axis="y" values={sequences} onReorder={onReorder}>
        <AnimatePresence>
          {sequences.map((sequence) => (
            <Reorder.Item
              key={sequence.id || sequence.sequence_order}
              value={sequence}
              className="rounded-lg border bg-background dark:bg-gray-800 dark:border-gray-700 p-6 cursor-move touch-none transition-colors hover:border-primary"
              whileDrag={{
                scale: 1.02,
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold dark:text-white">{sequence.title}</h3>
                    <div className="flex gap-2 text-sm text-muted-foreground dark:text-gray-400">
                      <span>{sequence.duration} min</span>
                      <span>•</span>
                      <span className="capitalize">{sequence.sequence_type}</span>
                      <span>•</span>
                      <span className="capitalize">
                        Intensité {sequence.intensity_level}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {onDuplicate && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => sequence.id && onDuplicate(sequence.id)}
                        className="dark:border-gray-600 dark:hover:bg-gray-700"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      onClick={() =>
                        setSelectedSequenceId(
                          selectedSequenceId === sequence.id ? null : sequence.id
                        )
                      }
                      className="dark:border-gray-600 dark:hover:bg-gray-700"
                    >
                      {selectedSequenceId === sequence.id
                        ? "Masquer les phases"
                        : "Voir les phases"}
                    </Button>
                  </div>
                </div>
                {sequence.description && (
                  <p className="mt-2 text-sm text-muted-foreground dark:text-gray-400">
                    {sequence.description}
                  </p>
                )}
                {sequence.objective && (
                  <p className="mt-2 text-sm font-medium dark:text-gray-300">
                    Objectif : {sequence.objective}
                  </p>
                )}
              </div>
              {selectedSequenceId === sequence.id && sequence.id && (
                <ExerciseForm sequenceId={sequence.id} />
              )}
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>
    </div>
  )
}
