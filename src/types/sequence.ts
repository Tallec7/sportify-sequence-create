
export type TacticalConcept = 
  | "montee_de_balle"
  | "repli_defensif" 
  | "contre_attaque"
  | "attaque_placee"
  | "defense_alignee"
  | "defense_etagee"

export interface ExerciseSuccessCriteria {
  id: string
  exercise_id?: string
  target_value: number
  unit: string
  description: string
}

export interface TechnicalProgression {
  id: string
  exercise_id?: string
  skill_name: string
  current_level: number | string
  target_level: number | string
  progression_notes?: string
}

export interface SequenceObjective {
  id: string
  description: string
  type: string
  is_priority: boolean
  order_index: number
  objective_type: string
  sequence_id?: string
}

export interface Exercise {
  id?: string
  title: string
  description: string
  duration: number
  intensity_level: string
  exercise_order: number
  activity_type: 'exercise' | 'situation'
  objective: string
  video_url?: string
  diagram_url?: string
  variations?: string[]
  tactical_concepts?: TacticalConcept[]
  success_criteria?: ExerciseSuccessCriteria[]
  technical_progressions?: TechnicalProgression[]
  opposition_type?: 'none' | 'passive' | 'active' | 'match'
  decision_making_focus?: string[]
  tactical_objectives?: string[]
  setup_instructions?: string
  player_instructions?: string
  coach_instructions?: string
  performance_metrics?: Record<string, any>
  progression_level?: number
}

export interface Sequence {
  id: string
  title: string
  description: string
  duration: number
  sequence_type: 'warmup' | 'main' | 'cooldown'
  intensity_level: string
  sequence_order: number
  session_id: string
  exercises: Exercise[]
  objective: string
}

