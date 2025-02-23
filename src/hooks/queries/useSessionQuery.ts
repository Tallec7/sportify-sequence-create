
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { SessionFormData } from "@/types/settings"
import { Database } from "@/integrations/supabase/types"

type SessionResponse = Database["public"]["Tables"]["sessions"]["Row"]

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

      // Ensure arrays are properly initialized and cast types correctly
      const processedData: SessionFormData = {
        title: sessionData.title,
        description: sessionData.description || "",
        sport: sessionData.sport,
        level: sessionData.level,
        duration: sessionData.duration,
        participants_min: sessionData.participants_min,
        participants_max: sessionData.participants_max,
        age_category: sessionData.age_category,
        intensity_level: sessionData.intensity_level || "medium",
        cycle_id: sessionData.cycle_id,
        objective: "", // This will be added once we update the database schema
        tactical_concepts: Array.isArray(sessionData.tactical_concepts) 
          ? sessionData.tactical_concepts 
          : [],
        decision_making_focus: Array.isArray(sessionData.decision_making_focus) 
          ? sessionData.decision_making_focus 
          : [],
        performance_metrics: Array.isArray(sessionData.performance_metrics) 
          ? sessionData.performance_metrics 
          : [],
        expert_validated: sessionData.expert_validated || false,
        validation_feedback: sessionData.validation_feedback || ""
      }

      return processedData
    },
    enabled: !!id,
  })
}
