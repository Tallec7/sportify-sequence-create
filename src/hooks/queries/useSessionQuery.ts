
import { useQuery } from "@tanstack/react-query"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import type { TacticalConceptEnum, AgeCategoryType, SessionObjective } from "@/types/settings"

export const useSessionQuery = (sessionId: string | undefined) => {
  const { toast } = useToast()

  return useQuery({
    queryKey: ["session", sessionId],
    queryFn: async () => {
      if (!sessionId) {
        return {
          title: "",
          description: "",
          sport: "",
          level: "",
          duration: 60,
          participants_min: 1,
          participants_max: 10,
          age_category: "U13" as AgeCategoryType,
          intensity_level: "medium",
          objective: "",
          tactical_concepts: [],
          decision_making_focus: [],
          performance_metrics: [],
          cycle_id: null,
          expert_validated: false,
          validation_feedback: "",
          objectives: [],
          session_sequences: []
        }
      }

      const { data, error } = await supabase
        .from("sessions")
        .select(`
          *,
          session_objectives (
            id,
            description,
            type,
            is_priority,
            order_index,
            objective_type
          ),
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
        .maybeSingle()

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load session"
        })
        throw error 
      }

      if (!data) {
        return {
          title: "",
          description: "",
          sport: "",
          level: "",
          duration: 60,
          participants_min: 1,
          participants_max: 10,
          age_category: "U13" as AgeCategoryType,
          intensity_level: "medium",
          objective: "",
          tactical_concepts: [],
          decision_making_focus: [],
          performance_metrics: [],
          cycle_id: null,
          expert_validated: false,
          validation_feedback: "",
          objectives: [],
          session_sequences: []
        }
      }

      return {
        ...data,
        objectives: data.session_objectives || [],
        cycle_id: data.cycle_id || null,
        expert_validated: data.expert_validated || false,
        validation_feedback: data.validation_feedback || "",
        tactical_concepts: data.tactical_concepts || [],
        decision_making_focus: data.decision_making_focus || [],
        performance_metrics: data.performance_metrics || [],
        age_category: (data.age_category || "U13") as AgeCategoryType,
        session_sequences: data.session_sequences || []
      }
    },
    enabled: true
  })
}
