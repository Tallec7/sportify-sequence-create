
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
  tactical_concepts?: string[]
  success_criteria?: Array<{
    id: string
    target_value: number
    unit: string
    description: string
  }>
  technical_progressions?: Array<{
    id: string
    skill_name: string
    current_level: string
    target_level: string
  }>
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
