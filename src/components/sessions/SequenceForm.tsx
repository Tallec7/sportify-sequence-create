
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { SequenceList } from "./SequenceList"
import { AddSequenceForm } from "./AddSequenceForm"
import { Sequence } from "@/types/sequence"

interface SequenceFormProps {
  sequences: Sequence[]
  onAddSequence: (sequence: Sequence) => void
}

export const SequenceForm = ({ sequences, onAddSequence }: SequenceFormProps) => {
  const [newSequence, setNewSequence] = useState<Sequence>({
    title: "",
    description: "",
    duration: 15,
    sequence_type: "main",
    intensity_level: "medium",
    sequence_order: sequences.length + 1,
  })
  const [selectedSequenceId, setSelectedSequenceId] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!["warmup", "main", "cooldown"].includes(newSequence.sequence_type)) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Le type de séquence doit être 'warmup', 'main' ou 'cooldown'.",
      })
      return
    }

    try {
      const { data: sequence, error } = await supabase
        .from("session_sequences")
        .insert([{
          ...newSequence,
          sequence_type: newSequence.sequence_type
        }])
        .select()
        .single()

      if (error) throw error

      if (sequence) {
        onAddSequence(sequence as Sequence)
        toast({
          title: "Succès",
          description: "La séquence a été ajoutée avec succès.",
        })

        setNewSequence({
          title: "",
          description: "",
          duration: 15,
          sequence_type: "main",
          intensity_level: "medium",
          sequence_order: sequences.length + 2,
        })
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message,
      })
    }
  }

  return (
    <div className="space-y-8">
      <div className="rounded-xl border bg-card p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Séquences</h2>
          <p className="text-muted-foreground">
            Ajoutez et organisez les séquences de votre séance
          </p>
        </div>

        <SequenceList
          sequences={sequences}
          selectedSequenceId={selectedSequenceId}
          setSelectedSequenceId={setSelectedSequenceId}
        />

        <AddSequenceForm
          newSequence={newSequence}
          setNewSequence={setNewSequence}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}
