
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { SequenceList } from "./SequenceList"
import { AddSequenceForm } from "./AddSequenceForm"
import { Sequence } from "@/types/sequence"
import { useParams } from "react-router-dom"

interface SequenceFormProps {
  sequences: Sequence[]
  onAddSequence: (sequence: Sequence) => void
}

export const SequenceForm = ({ sequences, onAddSequence }: SequenceFormProps) => {
  const { id: sessionId } = useParams()
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
    
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      toast({
        variant: "destructive",
        title: "Non autorisé",
        description: "Vous devez être connecté pour ajouter une séquence.",
      })
      return
    }

    if (!["warmup", "main", "cooldown"].includes(newSequence.sequence_type)) {
      toast({
        variant: "destructive",
        title: "Type de séquence invalide",
        description: "Le type de séquence doit être 'Échauffement', 'Principal' ou 'Retour au calme'.",
      })
      return
    }

    if (!sessionId) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'ajouter une séquence sans session associée.",
      })
      return
    }

    try {
      console.log("Tentative d'ajout de séquence avec:", {
        ...newSequence,
        session_id: sessionId,
        user_id: session.user.id
      })

      const { data: sequence, error } = await supabase
        .from("session_sequences")
        .insert([{
          ...newSequence,
          session_id: sessionId,
          sequence_type: newSequence.sequence_type
        }])
        .select()
        .single()

      if (error) {
        console.error("Error adding sequence:", error)
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Une erreur est survenue lors de l'ajout de la séquence. Veuillez réessayer.",
        })
        return
      }

      if (sequence) {
        onAddSequence(sequence as Sequence)
        toast({
          title: "Séquence ajoutée",
          description: "La séquence a été ajoutée avec succès à votre séance.",
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
      console.error("Error in handleSubmit:", error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout de la séquence. Veuillez réessayer.",
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
