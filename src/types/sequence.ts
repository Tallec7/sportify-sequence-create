
export interface Sequence {
  id?: string
  title: string
  description: string
  duration: number
  sequence_type: "warmup" | "main" | "cooldown"
  intensity_level: string
  sequence_order: number
  session_id?: string
}
