export type ActivityTypeEnum = "exercise" | "situation"

export interface BaseSettingType {
  id: string
  value: string
  label: string
  label_fr?: string
  label_en?: string
  is_default?: boolean
  last_modified_by?: string
  last_modified_at?: string
}

export interface Sport extends BaseSettingType {}

export interface Level extends BaseSettingType {}

export interface IntensityLevel extends BaseSettingType {}

export interface SequenceType extends BaseSettingType {}

export interface AgeCategory extends BaseSettingType {}

export interface TacticalConceptOption {
  id?: string
  value: string
  label: string
  sport_id?: string
}

export interface AgeCategory extends BaseSettingType {}

export type AgeCategoryType = "U9" | "U11" | "U13" | "U15" | "U17" | "U19" | "Senior"

// Define tactical concept enum type to match database
export type TacticalConceptEnum = "montee_de_balle" | "repli_defensif" | "contre_attaque" | "attaque_placee" | "defense_alignee" | "defense_etagee"

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

// Ajout du type pour les prompts
export type PromptTemplate = {
  id: string
  sport_id: string | null
  training_type: string
  prompt_text: string
  is_active: boolean
  is_validated: boolean
  is_default?: boolean
  created_at?: string
  updated_at?: string
}
