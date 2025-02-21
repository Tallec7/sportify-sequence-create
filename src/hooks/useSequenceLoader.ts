
import { useState } from "react"
import { useErrorToast } from "@/hooks/use-error-toast"
import { supabase } from "@/integrations/supabase/client"
import { Sequence } from "@/types/sequence"

export const useSequenceLoader = (sessionId: string | undefined) => {
  const { showError } = useErrorToast()
  const [sequences, setSequences] = useState<Sequence[]>([])

  const loadSequences = async (id: string) => {
    try {
      const { data: sequencesData, error: sequencesError } = await supabase
        .from('session_sequences')
        .select('*')
        .eq('session_id', id)
        .order('sequence_order', { ascending: true })

      if (sequencesError) throw sequencesError

      const validatedSequences = sequencesData.map(sequence => {
        const validSequenceType = sequence.sequence_type.toLowerCase() as "warmup" | "main" | "cooldown"
        if (!["warmup", "main", "cooldown"].includes(validSequenceType)) {
          throw new Error(`Type de séquence invalide: ${sequence.sequence_type}`)
        }
        return {
          id: sequence.id,
          title: sequence.title,
          description: sequence.description,
          duration: sequence.duration,
          sequence_type: validSequenceType,
          intensity_level: sequence.intensity_level,
          sequence_order: sequence.sequence_order,
          session_id: sequence.session_id
        } satisfies Sequence
      })

      setSequences(validatedSequences)
    } catch (error: any) {
      showError(error, "Erreur lors du chargement des séquences")
    }
  }

  return { sequences, setSequences, loadSequences }
}
