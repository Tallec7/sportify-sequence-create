
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { SessionObjective } from "../queries/useObjectivesQuery"
import { Database } from "@/integrations/supabase/types"

type ObjectiveType = Database["public"]["Enums"]["objective_type_enum"]

export const useObjectiveOrderMutation = (sessionId: string | undefined) => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (objectives: SessionObjective[]) => {
      if (!sessionId) throw new Error("Session ID is required")

      const updates = objectives.map((objective) => ({
        id: objective.id,
        description: objective.description,
        type: objective.type,
        is_priority: objective.is_priority,
        order_index: objective.order_index,
        objective_type: objective.objective_type as ObjectiveType,
        session_id: sessionId
      }))

      const { error } = await supabase
        .from("session_objectives")
        .upsert(updates, { onConflict: 'id' })

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

