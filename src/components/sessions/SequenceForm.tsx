
import { useState } from "react"
import { AddSequenceForm } from "./AddSequenceForm"
import { SequenceList } from "./SequenceList"
import { Sequence } from "@/types/sequence"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { type SessionFormData } from "@/types/settings"

interface SequenceFormProps {
  sequences: Sequence[]
  onAddSequence: (sequence: Sequence) => void
  onReorderSequences: (sequences: Sequence[]) => void
  formData: SessionFormData
}

export const SequenceForm = ({
  sequences,
  onAddSequence,
  onReorderSequences,
  formData
}: SequenceFormProps) => {
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedSequenceId, setSelectedSequenceId] = useState<string | null>(null)

  const sessionContext = {
    sport: formData.sport,
    level: formData.level,
    age_category: formData.age_category,
    intensity_level: formData.intensity_level
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Séquences</CardTitle>
        <CardDescription>
          Ajoutez et organisez les séquences de votre séance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <SequenceList
          sequences={sequences}
          selectedSequenceId={selectedSequenceId}
          setSelectedSequenceId={setSelectedSequenceId}
          onReorder={onReorderSequences}
          totalDuration={sequences.reduce((acc, seq) => acc + seq.duration, 0)}
          sessionContext={sessionContext}
        />
        {showAddForm ? (
          <AddSequenceForm
            newSequence={{
              id: '',
              title: "",
              description: "",
              duration: 30,
              sequence_type: "main",
              intensity_level: "medium",
              sequence_order: sequences.length + 1,
              exercises: [],
              objective: ""
            }}
            setNewSequence={() => {}}
            onSubmit={async (sequence) => {
              onAddSequence(sequence)
              setShowAddForm(false)
            }}
            onCancel={() => setShowAddForm(false)}
            sequences={sequences}
            sessionContext={sessionContext}
          />
        ) : (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full p-4 border-2 border-dashed rounded-lg text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
          >
            Ajouter une séquence
          </button>
        )}
      </CardContent>
    </Card>
  )
}
