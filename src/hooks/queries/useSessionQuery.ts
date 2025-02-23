
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { SessionFormData } from "@/types/settings"

export const useSessionQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: ["session", id],
    queryFn: async () => {
      if (!id) throw new Error("Session ID is required")
      
      const { data: sessionData, error: sessionError } = await supabase
        .from("sessions")
        .select("*")
        .eq("id", id)
        .maybeSingle()

      if (sessionError) throw sessionError
      if (!sessionData) throw new Error("Session not found")

      // Ensure arrays are properly initialized
      const processedData: SessionFormData = {
        ...sessionData,
        tactical_concepts: sessionData.tactical_concepts || [],
        decision_making_focus: sessionData.decision_making_focus || [],
        performance_metrics: sessionData.performance_metrics || [],
        objective: sessionData.objective || "",
        validation_feedback: sessionData.validation_feedback || "",
        expert_validated: sessionData.expert_validated || false
      }

      return processedData
    },
    enabled: !!id,
  })
}
