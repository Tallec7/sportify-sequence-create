
export interface Exercise {
  id: string
  title: string
  description: string
  duration: number
  player_instructions?: string
  setup_instructions?: string
  coach_instructions?: string
  intensity_level?: string
  variations?: string[]
  exercise_order: number
  activity_type: 'exercise' | 'situation'
  opposition_type?: string
  decision_making_focus?: string[]
  tactical_objectives?: string[]
  diagram_url?: string
  video_url?: string
  tactical_concepts?: TacticalConcept[]
  performance_metrics?: PerformanceMetrics
  progression_level?: number
  success_criteria?: ExerciseSuccessCriteria[]
  technical_progressions?: TechnicalProgression[]
}

export type TacticalConcept = "montee_de_balle" | "repli_defensif" | "contre_attaque" | "attaque_placee" | "defense_alignee" | "defense_etagee"

export interface PerformanceMetrics {
  [key: string]: number | string | boolean
}

export interface ExerciseSuccessCriteria {
  id: string
  exercise_id: string
  description: string
  target_value: number
  unit?: string
  created_at?: string
  updated_at?: string
}

export interface TechnicalProgression {
  id: string
  exercise_id: string
  skill_name: string
  current_level: number
  target_level: number
  progression_notes?: string
  created_at?: string
  updated_at?: string
}

export interface SequenceObjective {
  id: string
  sequence_id: string
  description: string
  objective_type: "apprentissage" | "developpement" | "perfectionnement"
  is_priority: boolean
  order_index: number
  created_at?: string
}

export interface Sequence {
  id?: string
  title: string
  description: string
  duration: number
  sequence_type: "warmup" | "main" | "cooldown"
  intensity_level: string
  sequence_order: number
  session_id?: string
  exercises?: Exercise[]
  objectives?: SequenceObjective[]
}
