
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom"
import { SessionFormData } from "@/components/sessions/SessionForm"

export const useSessionMutation = (sessionId: string | undefined, userId: string | null) => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (formData: SessionFormData) => {
      if (sessionId) {
        const { error } = await supabase
          .from('sessions')
          .update({
            ...formData,
            user_id: userId
          })
          .eq('id', sessionId)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('sessions')
          .insert([{
            ...formData,
            user_id: userId
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
        description: `Une erreur est survenue lors de la ${sessionId ? 'modification' : 'création'} de la séance.`,
      })
      console.error("Erreur mutation session:", error)
    }
  })
}
