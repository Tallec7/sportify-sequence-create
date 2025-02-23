
import { supabase } from "@/integrations/supabase/client"

export type ErrorType = "404" | "500" | "validation_error" | "sql_error" | "api_error" | "other"

interface SystemError {
  page_name: string
  error_type: ErrorType
  error_message: string
  stack_trace?: string
  details?: Record<string, any>
}

export const logSystemError = async (error: SystemError) => {
  try {
    const { error: dbError } = await supabase
      .from("system_errors")
      .insert({
        page_name: error.page_name,
        error_type: error.error_type,
        error_message: error.error_message,
        stack_trace: error.stack_trace,
        details: error.details || {}
      })

    if (dbError) {
      console.error("Failed to log system error:", dbError)
    }
  } catch (e) {
    console.error("Error logging system error:", e)
  }
}

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
