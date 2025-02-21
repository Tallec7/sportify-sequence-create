
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { Exercise } from "@/components/sessions/ExerciseForm"

export const useExerciseMutation = (sequenceId: string | undefined) => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ 
      id, 
      ...exercise 
    }: Partial<Exercise> & { id?: string }) => {
      if (!sequenceId) throw new Error("Sequence ID is required")

      if (id) {
        // Update existing exercise
        const { data, error } = await supabase
          .from("exercises")
          .update(exercise)
          .eq("id", id)
          .select()
          .single()

        if (error) throw error
        return data
      } else {
        // Create new exercise
        const { data, error } = await supabase
          .from("exercises")
          .insert([{ ...exercise, sequence_id: sequenceId }])
          .select()
          .single()

        if (error) throw error
        return data
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises", sequenceId] })
      toast({
        title: "Succès",
        description: "L'exercice a été sauvegardé avec succès.",
      })
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde de l'exercice.",
      })
      console.error("Exercise mutation error:", error)
    }
  })
}
