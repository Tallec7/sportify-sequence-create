
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"

export const useExerciseDeleteMutation = (sequenceId: string | undefined) => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (exerciseId: string) => {
      if (!sequenceId) throw new Error("Sequence ID is required")

      const { error } = await supabase
        .from("phases")
        .delete()
        .eq("id", exerciseId)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises", sequenceId] })
      toast({
        title: "Succès",
        description: "L'exercice a été supprimé avec succès.",
      })
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression de l'exercice.",
      })
      console.error("Exercise deletion error:", error)
    }
  })
}
