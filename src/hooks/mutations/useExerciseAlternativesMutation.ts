
import { useMutation } from "@tanstack/react-query"
import { Exercise } from "@/types/sequence"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { logPromptError } from "@/utils/promptErrorHandler"

interface ExerciseAlternativesContext {
  sport: string
  level: string
  age_category: string
  intensity_level: string
}

export const useExerciseAlternativesMutation = () => {
  const { toast } = useToast()

  return useMutation({
    mutationFn: async ({ exercise, sessionContext }: { 
      exercise: Exercise, 
      sessionContext: ExerciseAlternativesContext
    }) => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError) {
        throw new Error('Erreur d\'authentification')
      }

      if (!session) {
        throw new Error('Session non trouvée')
      }
      
      if (!sessionContext.sport || !sessionContext.level) {
        throw new Error('Le sport et le niveau sont requis')
      }

      const response = await fetch(
        'https://ldrowsmnqkiydtxpjhrt.supabase.co/functions/v1/generate-exercise-alternatives',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ exercise, sessionContext }),
        }
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const errorMessage = errorData.error || `Erreur lors de la génération des alternatives: ${response.status}`
        
        // Log error for debugging
        await logPromptError({
          training_type: 'exercise_alternatives',
          mode: 'generate',
          error_type: 'generation_error',
          details: {
            status: response.status,
            exercise_id: exercise.id,
            error: errorMessage,
            context: sessionContext
          }
        })

        throw new Error(errorMessage)
      }

      const data = await response.json()
      
      if (!data.alternatives || !Array.isArray(data.alternatives) || data.alternatives.length === 0) {
        throw new Error('Aucune alternative n\'a été générée')
      }

      return data
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message,
      })
    }
  })
}
