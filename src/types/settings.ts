
export type AgeCategoryType = "U9" | "U11" | "U13" | "U15" | "U17" | "U19" | "Senior"

export interface Level {
  id?: string
  value: string
  label: string
  label_fr?: string
  label_en?: string
  is_default?: boolean
  last_modified_by?: string
  last_modified_at?: string
}

export interface IntensityLevel {
  id?: string
  value: string
  label: string
}

export interface SequenceType {
  id?: string
  value: string
  label: string
}

export interface Sport {
  id: string
  value: string
  label: string
  icon?: string
}

export interface AgeCategory {
  id: string
  value: AgeCategoryType
  label: string
}

export type TacticalConcept = 
  | "montee_de_balle"
  | "repli_defensif" 
  | "contre_attaque"
  | "attaque_placee"
  | "defense_alignee"
  | "defense_etagee"

export enum TacticalConceptEnum {
  OFFENSIVE = "offensive",
  DEFENSIVE = "defensive",
  TRANSITION = "transition"
}

export enum ActivityTypeEnum {
  DRILL = "drill",
  GAME = "game",
  SITUATION = "situation",
  TRAINING = "training",
  EXERCISE = "exercise"
}

export enum ObjectiveType {
  LEARNING = "apprentissage",
  DEVELOPMENT = "developpement",
  PERFECTION = "perfectionnement"
}

export type SessionObjective = {
  id?: string
  description: string
  type: string
  is_priority: boolean
  order_index: number
  objective_type: ObjectiveType
  session_id?: string
}

export type TacticalConceptOption = {
  id: string
  value: TacticalConcept
  label: string
  sport_id?: string
}

export interface SequenceListProps {
  sequences: any[]
  selectedSequenceId: string | null
  setSelectedSequenceId: (id: string | null) => void
  onReorder: (sequences: any[]) => void
  onDuplicate?: (sequenceId: string) => void
  totalDuration: number
  sessionContext?: {
    sport: string
    level: string
    age_category: AgeCategoryType
    intensity_level: string
  }
}

export interface AddSequenceFormProps {
  newSequence: any
  setNewSequence: (sequence: any) => void
  onSubmit: (sequence: any) => Promise<void>
  onCancel: () => void
  sequences: any[]
  sessionContext?: {
    sport: string
    level: string
    age_category: AgeCategoryType
    intensity_level: string
  }
}

export interface SessionFormData {
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
  tactical_concepts: TacticalConcept[]
  decision_making_focus: string[]
  performance_metrics: string[]
  expert_validated: boolean
  validation_feedback: string
  objectives: SessionObjective[]
}
