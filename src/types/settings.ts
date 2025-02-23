
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

export interface TacticalConceptOption {
  value: string
  label: string
  sport_id?: string
}

export enum TacticalConceptEnum {
  OFFENSIVE = "offensive",
  DEFENSIVE = "defensive",
  TRANSITION = "transition"
}

export enum ActivityTypeEnum {
  DRILL = "drill",
  GAME = "game",
  SITUATION = "situation",
  TRAINING = "training"
}

export enum ObjectiveType {
  LEARNING = "apprentissage",
  DEVELOPMENT = "developpement",
  PERFECTION = "perfectionnement"
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
  tactical_concepts: string[]
  decision_making_focus: string[]
  performance_metrics: string[]
  expert_validated: boolean
  validation_feedback: string
  objectives: Array<{
    id?: string
    description: string
    type: string
    is_priority: boolean
    order_index: number
    objective_type: string
    session_id?: string
  }>
}

export interface SessionObjectivesFormProps {
  formData: SessionFormData
  handleSelectChange: (name: string, value: string) => void
  handleTextChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export interface SessionBasicInfoFormProps {
  formData: SessionFormData
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSelectChange: (name: string, value: string) => void
  handleNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface SequenceListProps {
  sequences: any[]
  onReorder: (sequences: any[]) => void
  sessionContext?: {
    sport: string
    level: string
    age_category: AgeCategoryType
    intensity_level: string
  }
}

export interface AddSequenceFormProps {
  onAdd: (sequence: any) => void
  onCancel: () => void
  sequences: any[]
  sessionContext?: {
    sport: string
    level: string
    age_category: AgeCategoryType
    intensity_level: string
  }
}

