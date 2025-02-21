
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { Exercise } from "@/types/sequence"

export const useExerciseOrderMutation = (sequenceId: string) => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (exercises: Exercise[]) => {
      if (!sequenceId) throw new Error("Sequence ID is required")

      const updatePromises = exercises.map((exercise, index) =>
        supabase
          .from("exercises")
          .update({ exercise_order: index + 1 })
          .eq("id", exercise.id)
      )

      await Promise.all(updatePromises)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises", sequenceId] })
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour de l'ordre des exercices.",
      })
      console.error("Erreur mutation ordre des exercices:", error)
    }
  })
}

