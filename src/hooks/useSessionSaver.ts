import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { useErrorToast } from "@/hooks/use-error-toast"
import { Sequence } from "@/types/sequence"
import { SessionFormData } from '@/types/settings'
import { Database } from "@/integrations/supabase/types"

type AgeCategory = Database["public"]["Enums"]["age_category_enum"]

export const useSessionSaver = (id: string | undefined, userId: string | null) => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { showError } = useErrorToast()

  const handleSave = async (formData: SessionFormData, sequences: Sequence[]) => {
    try {
      console.log("Starting save process with sequences:", sequences)

      if (id) {
        const { error: sessionError } = await supabase
          .from('sessions')
          .update({
            ...formData,
            user_id: userId,
            age_category: formData.age_category as AgeCategory
          })
          .eq('id', id)

        if (sessionError) throw sessionError

        const { error: deleteError } = await supabase
          .from('session_sequences')
          .delete()
          .eq('session_id', id)

        if (deleteError) throw deleteError

        if (sequences.length > 0) {
          const validatedSequences = sequences.map(sequence => ({
            ...sequence,
            sequence_type: sequence.sequence_type.toLowerCase() as "warmup" | "main" | "cooldown",
            session_id: id,
          }))

          const { error: sequencesError } = await supabase
            .from('session_sequences')
            .insert(validatedSequences)

          if (sequencesError) throw sequencesError
        }
      } else {
        const { data: sessionData, error: sessionError } = await supabase
          .from('sessions')
          .insert([{
            ...formData,
            user_id: userId,
            age_category: formData.age_category as AgeCategory
          }])
          .select()
          .single()

        if (sessionError) throw sessionError

        if (sequences.length > 0) {
          const validatedSequences = sequences.map(sequence => ({
            ...sequence,
            sequence_type: sequence.sequence_type.toLowerCase() as "warmup" | "main" | "cooldown",
            session_id: sessionData.id,
          }))

          const { error: sequencesError } = await supabase
            .from('session_sequences')
            .insert(validatedSequences)

          if (sequencesError) throw sequencesError
        }
      }

      toast({
        title: "Succès",
        description: `La séance a été ${id ? 'modifiée' : 'créée'} avec succès.`,
      })
      navigate("/dashboard")
    } catch (error: any) {
      showError(error, "Erreur lors de la sauvegarde")
    }
  }

  return { handleSave }
}
