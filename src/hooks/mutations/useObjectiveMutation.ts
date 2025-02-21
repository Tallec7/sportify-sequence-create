
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { SessionObjective } from "../queries/useObjectivesQuery"
import { Database } from "@/integrations/supabase/types"

type ObjectiveType = Database["public"]["Enums"]["objective_type_enum"]

export const useObjectiveMutation = (sessionId: string | undefined) => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (objective: Omit<SessionObjective, 'id'>) => {
      if (!sessionId) throw new Error("Session ID is required")

      const { data: objectives, error: existingError } = await supabase
        .from("session_objectives")
        .select("order_index")
        .eq("session_id", sessionId)
        .order("order_index", { ascending: false })
        .limit(1)

      if (existingError) throw existingError

      const nextOrderIndex = objectives.length > 0 ? objectives[0].order_index + 1 : 0

      const { error } = await supabase
        .from("session_objectives")
        .insert([{
          ...objective,
          session_id: sessionId,
          order_index: objective.order_index ?? nextOrderIndex,
          objective_type: objective.objective_type as ObjectiveType
        }])

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["objectives", sessionId] })
      toast({
        title: "Succès",
        description: "L'objectif a été ajouté avec succès."
      })
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout de l'objectif."
      })
      console.error("Error adding objective:", error)
    }
  })
}

