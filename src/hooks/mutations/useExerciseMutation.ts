
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { Exercise } from "@/types/sequence"

export const useExerciseMutation = (sequenceId: string | undefined) => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ 
      id, 
      ...exercise 
    }: Partial<Exercise> & { id?: string }) => {
      if (!sequenceId) throw new Error("Sequence ID is required")

      // Ensure required fields are present
      const exerciseData = {
        sequence_id: sequenceId,
        title: exercise.title || "",
        description: exercise.description || "",
        duration: exercise.duration || 0,
        intensity_level: exercise.intensity_level || "medium",
        exercise_order: exercise.exercise_order || 0,
        coach_instructions: exercise.coach_instructions,
        player_instructions: exercise.player_instructions,
        setup_instructions: exercise.setup_instructions,
        activity_type: exercise.activity_type || "exercise",
        opposition_type: exercise.opposition_type,
        decision_making_focus: exercise.decision_making_focus,
        tactical_objectives: exercise.tactical_objectives,
      }

      if (id) {
        // Update existing exercise
        const { data, error } = await supabase
          .from("exercises")
          .update(exerciseData)
          .eq("id", id)
          .select()
          .single()

        if (error) throw error
        return data
      } else {
        // Create new exercise
        const { data, error } = await supabase
          .from("exercises")
          .insert([exerciseData])
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
