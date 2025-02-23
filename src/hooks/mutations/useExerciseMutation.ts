
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { Exercise, TacticalConcept } from "@/types/sequence"

export const useExerciseMutation = (sequenceId: string | undefined) => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ 
      id, 
      ...exercise 
    }: Partial<Exercise> & { id?: string }) => {
      if (!sequenceId) throw new Error("Sequence ID is required")

      // Validate tactical concepts to ensure they match the expected enum values
      const validTacticalConcepts = exercise.tactical_concepts?.filter((concept): concept is TacticalConcept => {
        return ["montee_de_balle", "repli_defensif", "contre_attaque", "attaque_placee", "defense_alignee", "defense_etagee"].includes(concept)
      }) || []

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
        diagram_url: exercise.diagram_url,
        video_url: exercise.video_url,
        tactical_concepts: validTacticalConcepts,
        performance_metrics: exercise.performance_metrics || {},
        progression_level: exercise.progression_level || 1,
        objective: exercise.objective || "À définir"  // Added objective field
      }

      if (id) {
        // Update existing exercise
        const { data, error } = await supabase
          .from("phases")
          .update(exerciseData)
          .eq("id", id)
          .select()
          .single()

        if (error) throw error
        return data
      } else {
        // Create new exercise
        const { data, error } = await supabase
          .from("phases")
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
