
import { useQuery } from "@tanstack/react-query"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import type { TacticalConceptEnum } from "@/types/settings"

export const useSessionQuery = (sessionId: string) => {
  const { toast } = useToast()

  return useQuery({
    queryKey: ["session", sessionId],
    queryFn: async () => {
      // Check if tactical concept is valid
      const isValidTacticalConcept = (value: string): value is TacticalConceptEnum => {
        return ["montee_de_balle", "repli_defensif", "contre_attaque", "attaque_placee", "defense_alignee", "defense_etagee"].includes(value as TacticalConceptEnum)
      }

      const { data, error } = await supabase
        .from("sessions")
        .select(`
          *,
          session_sequences (
            id,
            title,
            objective,
            description,
            duration,
            sequence_order,
            intensity_level,
            sequence_type,
            tactical_concepts,
            decision_making_focus,
            performance_metrics
          )
        `)
        .eq("id", sessionId)
        .single()

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load session"
        })
        throw error
      }

      // Ensure tactical_concepts array only contains valid values
      const validTacticalConcepts = (data.tactical_concepts || []).filter(isValidTacticalConcept)

      return {
        ...data,
        tactical_concepts: validTacticalConcepts,
        decision_making_focus: data.decision_making_focus || [],
        performance_metrics: data.performance_metrics || {},
        sequences: data.session_sequences || []
      }
    }
  })
}
