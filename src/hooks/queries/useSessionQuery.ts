
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { SessionFormData, TacticalConceptEnum } from "@/types/settings"
import { Database } from "@/integrations/supabase/types"
import { useTacticalConceptsQuery } from "./useTacticalConceptsQuery"

type SessionResponse = Database["public"]["Tables"]["sessions"]["Row"]
type Json = Database["public"]["Tables"]["sessions"]["Row"]["tactical_concepts"][number]

// Helper function to safely convert Json array to tactical concepts enum array
const convertJsonToTacticalConcepts = (
  arr: Json[] | null, 
  validConcepts: string[]
): TacticalConceptEnum[] => {
  if (!Array.isArray(arr)) return []
  
  return arr.filter((item): item is TacticalConceptEnum => 
    typeof item === 'string' && validConcepts.includes(item)
  ) as TacticalConceptEnum[]
}

// Helper function to safely convert Json array to string array
const convertJsonArrayToStringArray = (arr: Json[] | null): string[] => {
  if (!Array.isArray(arr)) return []
  return arr.filter((item): item is string => typeof item === 'string')
}

export const useSessionQuery = (id: string | undefined) => {
  // Fetch tactical concepts dynamically
  const { data: tacticalConceptsData } = useTacticalConceptsQuery("handball") // Default sport, should be dynamic based on session

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

      const validConcepts = tacticalConceptsData?.map(concept => concept.value) || []

      // Process the tactical concepts array first
      const tacticalConcepts = convertJsonToTacticalConcepts(
        sessionData.tactical_concepts,
        validConcepts
      )

      // Create the processed data object
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
        objective: sessionData.objective || "",
        tactical_concepts: tacticalConcepts,
        decision_making_focus: convertJsonArrayToStringArray(sessionData.decision_making_focus),
        performance_metrics: convertJsonArrayToStringArray(sessionData.performance_metrics),
        expert_validated: sessionData.expert_validated || false,
        validation_feedback: sessionData.validation_feedback || ""
      }

      return processedData
    },
    enabled: !!id,
  })
}
