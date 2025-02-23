
export interface Sport {
  id: string  // Make id required
  value: string
  label: string
}

export interface TacticalConceptOption {
  id: string  // Make id required
  value: string
  label: string
  sport_id?: string
}

export interface Level {
  id: string  // Make id required
  value: string
  label: string
}

export interface IntensityLevel {
  id: string  // Make id required
  value: string
  label: string
}

export interface SequenceType {
  id: string  // Make id required
  value: string
  label: string
}

export interface AgeCategory {
  id: string  // Make id required
  value: string
  label: string
}

export interface ActivityType {
  id: string  // Make id required
  value: string
  label: string
}

export type AgeCategoryType = "U9" | "U11" | "U13" | "U15" | "U17" | "U19" | "Senior"
export type ActivityTypeEnum = "exercise" | "situation"

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
}

export type SequenceFormData = {
  title: string
  description?: string
  sequence_type: string
  duration: number
  intensity_level: string
  sequence_order: number  // Add required field
}

export type ExerciseFormData = {
  title: string
  description: string
  activity_type: ActivityTypeEnum  // Use proper enum type
  duration: number
  intensity_level?: string
  exercise_order: number
}
