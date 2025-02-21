
import { toast } from "@/components/ui/use-toast"

export const useErrorToast = () => {
  const showError = (error: Error | string, title?: string) => {
    console.error("Error:", error)
    toast({
      variant: "destructive",
      title: title || "Erreur",
      description: typeof error === "string" ? error : error.message || "Une erreur est survenue.",
    })
  }

  return { showError }
}
