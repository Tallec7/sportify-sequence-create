
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Sequence } from "@/types/sequence"

export const useSequencesQuery = (sessionId: string | undefined) => {
  return useQuery({
    queryKey: ["sequences", sessionId],
    queryFn: async () => {
      if (!sessionId) throw new Error("Session ID is required")

      const { data: sequencesData, error: sequencesError } = await supabase
        .from("session_sequences")
        .select("*")
        .eq("session_id", sessionId)
        .order("sequence_order", { ascending: true })

      if (sequencesError) throw sequencesError

      const validatedSequences = sequencesData.map(sequence => {
        const validSequenceType = sequence.sequence_type.toLowerCase() as "warmup" | "main" | "cooldown"
        if (!["warmup", "main", "cooldown"].includes(validSequenceType)) {
          throw new Error(`Invalid sequence type: ${sequence.sequence_type}`)
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

      return validatedSequences
    },
    enabled: !!sessionId,
  })
}
