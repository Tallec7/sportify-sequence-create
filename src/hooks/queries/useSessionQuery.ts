import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { SessionFormData, TacticalConceptEnum } from "@/types/settings"
import { Database } from "@/integrations/supabase/types"
import { useTacticalConceptsQuery } from "./useTacticalConceptsQuery"

type SessionResponse = Database["public"]["Tables"]["sessions"]["Row"]
type Json = Database["public"]["Tables"]["sessions"]["Row"]["tactical_concepts"][number]

// ✅ Fonction pour convertir un tableau JSON en TacticalConceptEnum[]
const convertJsonToTacticalConcepts = (
  arr: Json[] | null, 
  validConcepts: TacticalConceptEnum[]
): TacticalConceptEnum[] => {
  if (!Array.isArray(arr)) return []
  
  return arr.filter((item): item is TacticalConceptEnum => 
    typeof item === 'string' && validConcepts.includes(item as TacticalConceptEnum)
  )
}

// ✅ Vérification si une valeur appartient à `TacticalConceptEnum`
const isTacticalConceptEnum = (value: string): value is TacticalConceptEnum => {
  return [
    'montee_de_balle',
    'repli_defensif',
    'contre_attaque',
    'attaque_placee',
    'defense_alignee',
    'defense_etagee'
  ].includes(value)
}

// ✅ Convertit un tableau de chaînes en `TacticalConceptEnum[]`
const convertStringArrayToEnum = (arr: string[]): TacticalConceptEnum[] => {
  const validConcepts: TacticalConceptEnum[] = [
    "montee_de_balle",
    "repli_defensif",
    "contre_attaque",
    "attaque_placee",
    "defense_alignee",
    "defense_etagee"
  ]
  return arr
    .map(item => item as TacticalConceptEnum)
    .filter(item => validConcepts.includes(item))
}

// ✅ Convertit un tableau JSON en `string[]`
const convertJsonArrayToStringArray = (arr: Json[] | null): string[] => {
  if (!Array.isArray(arr)) return []
  return arr.filter((item): item is string => typeof item === 'string')
}

export const useSessionQuery = (id: string | undefined) => {
  // ✅ Récupération dynamique des concepts tactiques
  const { data: tacticalConceptsData } = useTacticalConceptsQuery("handball") // ⚠️ Devrait être dynamique

  return useQuery({
    queryKey: ["session", id],
    queryFn: async () => {
      if (!id) throw new Error("Session ID is required")
      
      const { data: sessionData, error: sessionError } = await supabase
        .from("sessions")
        .select("*, objective")  // ✅ Ajout du champ `objective`
        .eq("id", id)
        .maybeSingle()

      if (sessionError) throw sessionError
      if (!sessionData) throw new Error("Session not found")

      // ✅ Récupération des valeurs dynamiques de `dropdown-settings`
      const validConcepts = tacticalConceptsData?.map(concept => concept.value as TacticalConceptEnum) || []

      // ✅ Vérification et conversion des concepts tactiques
      const tacticalConcepts = convertJsonToTacticalConcepts(
        sessionData.tactical_concepts,
        validConcepts
      )

      // ✅ Création de l'objet final `SessionFormData`
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
        objective: sessionData.objective ?? "",  // ✅ Évite les erreurs TypeScript
        tactical_concepts: tacticalConcepts,  // ✅ Correction ici
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
