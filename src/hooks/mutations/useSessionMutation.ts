
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom"
import { Database } from "@/integrations/supabase/types"

type AgeCategory = Database["public"]["Enums"]["age_category_enum"]

export type SessionFormData = {
  title: string
  description: string
  sport: string
  level: string
  duration: number
  participants_min: number
  participants_max: number
  age_category: AgeCategory
  intensity_level: string
  cycle_id: string | null
  objective: string
}

type ValidationError = { field: string; message: string }

const isValidAgeCategory = (category: string): category is AgeCategory => {
  return ['U9', 'U11', 'U13', 'U15', 'U17', 'U19', 'Senior'].includes(category)
}

const validateSessionData = (formData: SessionFormData): ValidationError[] => {
  const errors: ValidationError[] = []

  if (!formData.title?.trim()) {
    errors.push({ field: 'title', message: 'Le titre est requis' })
  }

  if (!formData.sport?.trim()) {
    errors.push({ field: 'sport', message: 'Le sport est requis' })
  }

  if (!formData.level?.trim()) {
    errors.push({ field: 'level', message: 'Le niveau est requis' })
  }

  if (!formData.objective?.trim()) {
    errors.push({ field: 'objective', message: 'L\'objectif est requis' })
  }

  if (!formData.age_category || !isValidAgeCategory(formData.age_category)) {
    errors.push({ field: 'age_category', message: 'Catégorie d\'âge invalide' })
  }

  if (formData.duration < 1) {
    errors.push({ field: 'duration', message: 'La durée doit être supérieure à 0' })
  }

  if (formData.participants_min < 1) {
    errors.push({ field: 'participants_min', message: 'Le nombre minimum de participants doit être supérieur à 0' })
  }

  if (formData.participants_max < formData.participants_min) {
    errors.push({ field: 'participants_max', message: 'Le nombre maximum de participants doit être supérieur au minimum' })
  }

  return errors
}

export const useSessionMutation = (sessionId: string | undefined, userId: string | null) => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (formData: SessionFormData) => {
      const validationErrors = validateSessionData(formData)
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.map(e => e.message).join('\n'))
      }

      if (!isValidAgeCategory(formData.age_category)) {
        throw new Error('Catégorie d\'âge invalide')
      }

      const sessionData = {
        ...formData,
        user_id: userId,
      }

      if (sessionId) {
        const { error } = await supabase
          .from('sessions')
          .update(sessionData)
          .eq('id', sessionId)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('sessions')
          .insert([sessionData])

        if (error) throw error
      }
    },
    onSuccess: () => {
      toast({
        title: "Succès",
        description: `La séance a été ${sessionId ? 'modifiée' : 'créée'} avec succès.`,
      })
      queryClient.invalidateQueries({ queryKey: ["sessions"] })
      navigate("/dashboard")
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || `Une erreur est survenue lors de la ${sessionId ? 'modification' : 'création'} de la séance.`,
      })
      console.error("Erreur mutation session:", error)
    }
  })
}
