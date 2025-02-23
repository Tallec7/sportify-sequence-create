
import { z } from "zod"
import type { Sport } from "@/types/settings"

export type PromptTemplate = {
  id: string
  sport_id: string | null
  training_type: string
  prompt_text: string
  is_active: boolean
  is_validated: boolean
  created_at?: string
  updated_at?: string
  is_default?: boolean
  sports?: {
    label: string
  } | null
}

export const promptTemplateFormSchema = z.object({
  sport_id: z.string().nullable(),
  training_type: z.string().min(1, "Training type is required"),
  prompt_text: z.string().min(1, "Prompt text is required"),
  is_active: z.boolean(),
  is_validated: z.boolean(),
  is_default: z.boolean().optional()
})

export type PromptTemplateFormValues = z.infer<typeof promptTemplateFormSchema>

export interface PromptTemplateDialogProps {
  template: PromptTemplate | null
  sports: Sport[]
  open: boolean
  onOpenChange: (open: boolean) => void
}
