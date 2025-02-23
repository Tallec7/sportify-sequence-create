
export type ActivityTypeEnum = "exercise" | "situation"

export interface Sport {
  id: string
  value: string
  label: string
}

export interface Level {
  id: string
  value: string
  label: string
}

export interface IntensityLevel {
  id: string
  value: string
  label: string
}

export interface SequenceType {
  id: string
  value: string
  label: string
}

export interface TacticalConceptOption {
  id?: string
  value: string
  label: string
  sport_id?: string
}

export interface AgeCategory {
  id: string
  value: string
  label: string
}

export type AgeCategoryType = "U9" | "U11" | "U13" | "U15" | "U17" | "U19" | "Senior"

// Define tactical concept enum type to match database
export type TacticalConceptEnum = Database["public"]["Enums"]["tactical_concept_enum"]

export type SessionFormData = {
  title: string
  description: string
  sport: string
  level: string
  duration: number
  participants_min: number
  participants_max: number
  age_category: AgeCategoryType
  intensity_level: string
  cycle_id: string | null
  objective: string
  tactical_concepts?: TacticalConceptEnum[]
  decision_making_focus?: string[]
  performance_metrics?: string[]
  expert_validated?: boolean
  validation_feedback?: string
  created_at?: string
  updated_at?: string
  user_id?: string
}
