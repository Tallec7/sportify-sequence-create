
import { SessionFormData } from "@/hooks/mutations/useSessionMutation"
import { toast } from "@/components/ui/use-toast"

export const validateFormData = (formData: SessionFormData): boolean => {
  if (!formData.title?.trim()) {
    toast({
      variant: "destructive",
      title: "Erreur de validation",
      description: "Le titre de la séance est requis",
    })
    return false
  }

  if (!formData.sport?.trim()) {
    toast({
      variant: "destructive",
      title: "Erreur de validation",
      description: "Le sport est requis",
    })
    return false
  }

  if (!formData.level?.trim()) {
    toast({
      variant: "destructive",
      title: "Erreur de validation",
      description: "Le niveau est requis",
    })
    return false
  }

  if (!formData.objective?.trim()) {
    toast({
      variant: "destructive",
      title: "Erreur de validation",
      description: "L'objectif de la séance est requis",
    })
    return false
  }

  return true
}
