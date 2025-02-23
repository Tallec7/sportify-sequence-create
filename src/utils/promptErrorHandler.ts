
import { supabase } from "@/integrations/supabase/client"

export type PromptErrorType = "template_not_found" | "parsing_error" | "validation_error" | "generation_error"

interface PromptError {
  training_type: string
  mode: string
  error_type: PromptErrorType
  details?: Record<string, any>
}

export const logPromptError = async (error: PromptError) => {
  try {
    const { error: dbError } = await supabase
      .from("prompt_errors")
      .insert({
        training_type: error.training_type,
        mode: error.mode,
        error_type: error.error_type,
        details: error.details || {}
      })

    if (dbError) {
      console.error("Failed to log prompt error:", dbError)
    }
  } catch (e) {
    console.error("Error logging prompt error:", e)
  }
}

export const resolvePromptError = async (errorId: string) => {
  try {
    const { error: dbError } = await supabase
      .from("prompt_errors")
      .update({ resolved_at: new Date().toISOString() })
      .eq("id", errorId)

    if (dbError) {
      console.error("Failed to resolve prompt error:", dbError)
    }
  } catch (e) {
    console.error("Error resolving prompt error:", e)
  }
}
