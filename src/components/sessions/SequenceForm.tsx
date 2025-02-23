
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
import { SessionFormData } from "@/types/settings"

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
          onReorder={onReorderSequences}
          sessionContext={sessionContext}
        />
        {showAddForm ? (
          <AddSequenceForm
            onAdd={onAddSequence}
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
