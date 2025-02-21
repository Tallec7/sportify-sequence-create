
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { SessionObjective } from "../queries/useObjectivesQuery"

export const useObjectiveOrderMutation = (sessionId: string | undefined) => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (objectives: SessionObjective[]) => {
      if (!sessionId) throw new Error("Session ID is required")

      const updates = objectives.map((objective, index) => ({
        id: objective.id,
        order_index: index
      }))

      const { error } = await supabase
        .from("session_objectives")
        .upsert(updates)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["objectives", sessionId] })
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la réorganisation des objectifs."
      })
      console.error("Error reordering objectives:", error)
    }
  })
}
