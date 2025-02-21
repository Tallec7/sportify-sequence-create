
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
}
