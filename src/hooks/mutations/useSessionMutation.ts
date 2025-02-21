
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom"
import { SessionFormData } from "@/components/sessions/SessionForm"
import { Database } from "@/integrations/supabase/types"

type AgeCategory = Database["public"]["Enums"]["age_category_enum"]

const isValidAgeCategory = (category: string): category is AgeCategory => {
  return ['U9', 'U11', 'U13', 'U15', 'U17', 'U19', 'Senior'].includes(category)
}

export const useSessionMutation = (sessionId: string | undefined, userId: string | null) => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (formData: SessionFormData) => {
      if (!formData.age_category || !isValidAgeCategory(formData.age_category)) {
        throw new Error("Catégorie d'âge invalide")
      }

      if (sessionId) {
        const { error } = await supabase
          .from('sessions')
          .update({
            ...formData,
            user_id: userId,
            age_category: formData.age_category
          })
          .eq('id', sessionId)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('sessions')
          .insert([{
            ...formData,
            user_id: userId,
            age_category: formData.age_category
          }])

        if (error) throw error
      }
    },
    onSuccess: () => {
      toast({
        title: "Succès",
        description: `La séance a été ${sessionId ? 'modifiée' : 'créée'} avec succès.`,
      })
      queryClient.invalidateQueries({ queryKey: ["sessions"] })
      navigate("/dashboard")
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || `Une erreur est survenue lors de la ${sessionId ? 'modification' : 'création'} de la séance.`,
      })
      console.error("Erreur mutation session:", error)
    }
  })
}
