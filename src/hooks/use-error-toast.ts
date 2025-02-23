
import { toast } from "@/components/ui/use-toast"
import { logSystemError } from "@/utils/promptErrorHandler"

export const useErrorToast = () => {
  const showError = async (error: Error | string, title?: string, pageName?: string) => {
    const errorMessage = typeof error === "string" ? error : error.message || "Une erreur est survenue."
    
    // Log the error to our system_errors table
    await logSystemError({
      page_name: pageName || window.location.pathname,
      error_type: "other",
      error_message: errorMessage,
      stack_trace: error instanceof Error ? error.stack : undefined
    })

    // Show toast notification to user
    toast({
      variant: "destructive",
      title: title || "Erreur",
      description: errorMessage,
    })
  }

  return { showError }
}
