
import { useQuery } from "@tanstack/react-query"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import type { TacticalConceptEnum } from "@/types/settings"

export const useSessionQuery = (sessionId: string | undefined) => {
  const { toast } = useToast()

  return useQuery({
    queryKey: ["session", sessionId],
    queryFn: async () => {
      // Si pas d'ID, on retourne une session vide
      if (!sessionId) {
        return {
          title: "",
          description: "",
          sport: "",
          level: "",
          duration: 60,
          participants_min: 1,
          participants_max: 10,
          age_category: "U13",
          intensity_level: "medium",
          objective: "",
          tactical_concepts: [],
          decision_making_focus: [],
          performance_metrics: [],
          session_sequences: []
        }
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
        .maybeSingle()

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load session"
        })
        throw error 
      }

      // Si aucune session trouvée, on retourne une session vide
      if (!data) {
        return {
          title: "",
          description: "",
          sport: "",
          level: "",
          duration: 60,
          participants_min: 1, 
          participants_max: 10,
          age_category: "U13",
          intensity_level: "medium",
          objective: "",
          tactical_concepts: [],
          decision_making_focus: [],
          performance_metrics: [],
          session_sequences: []
        }
      }

      const isValidTacticalConcept = (value: string): value is TacticalConceptEnum => {
        return ["montee_de_balle", "repli_defensif", "contre_attaque", "attaque_placee", "defense_alignee", "defense_etagee"].includes(value as TacticalConceptEnum)
      }

      const validTacticalConcepts = Array.isArray(data.tactical_concepts) 
        ? data.tactical_concepts.filter(isValidTacticalConcept)
        : []

      const performance_metrics = Array.isArray(data.performance_metrics) 
        ? data.performance_metrics.map(item => String(item))
        : []

      // Get the objective from the first sequence or default to empty string
      const objective = data.session_sequences?.[0]?.objective || ""

      return {
        ...data,
        objective, // Add objective property
        tactical_concepts: validTacticalConcepts,
        decision_making_focus: Array.isArray(data.decision_making_focus) ? data.decision_making_focus : [],
        performance_metrics,
        session_sequences: data.session_sequences?.map(sequence => ({
          ...sequence,
          objective: sequence.objective || ""
        })) || []
      }
    },
    enabled: true // La query s'exécute même si sessionId est undefined
  })
}

