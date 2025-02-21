
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { Sequence } from "@/types/sequence"
import { SessionFormData } from "@/components/sessions/SessionForm"

export const useSessionSaver = (id: string | undefined, userId: string | null) => {
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSave = async (formData: SessionFormData, sequences: Sequence[]) => {
    try {
      console.log("Starting save process with sequences:", sequences)

      if (id) {
        const { error: sessionError } = await supabase
          .from('sessions')
          .update({
            ...formData,
            user_id: userId
          })
          .eq('id', id)

        if (sessionError) {
          console.error("Error updating session:", sessionError)
          throw sessionError
        }

        const { error: deleteError } = await supabase
          .from('session_sequences')
          .delete()
          .eq('session_id', id)

        if (deleteError) {
          console.error("Error deleting sequences:", deleteError)
          throw deleteError
        }

        if (sequences.length > 0) {
          const validatedSequences = sequences.map(sequence => ({
            ...sequence,
            sequence_type: sequence.sequence_type.toLowerCase() as "warmup" | "main" | "cooldown",
            session_id: id,
          }))

          const { error: sequencesError } = await supabase
            .from('session_sequences')
            .insert(validatedSequences)

          if (sequencesError) {
            console.error("Error saving sequences:", sequencesError)
            throw sequencesError
          }
        }
      } else {
        const { data: sessionData, error: sessionError } = await supabase
          .from('sessions')
          .insert([{
            ...formData,
            user_id: userId
          }])
          .select()
          .single()

        if (sessionError) {
          console.error("Error saving session:", sessionError)
          throw sessionError
        }

        if (sequences.length > 0) {
          const validatedSequences = sequences.map(sequence => ({
            ...sequence,
            sequence_type: sequence.sequence_type.toLowerCase() as "warmup" | "main" | "cooldown",
            session_id: sessionData.id,
          }))

          const { error: sequencesError } = await supabase
            .from('session_sequences')
            .insert(validatedSequences)

          if (sequencesError) {
            console.error("Error saving sequences:", sequencesError)
            throw sequencesError
          }
        }
      }

      toast({
        title: "Succès",
        description: `La séance a été ${id ? 'modifiée' : 'créée'} avec succès.`,
      })
      navigate("/dashboard")
    } catch (error: any) {
      console.error("Save error:", error)
      toast({
        variant: "destructive",
        title: "Erreur lors de la sauvegarde",
        description: error.message || "Une erreur est survenue lors de la sauvegarde de la séance.",
      })
    }
  }

  return { handleSave }
}
