
export type AgeCategoryType = "U9" | "U11" | "U13" | "U15" | "U17" | "U19" | "Senior"

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

