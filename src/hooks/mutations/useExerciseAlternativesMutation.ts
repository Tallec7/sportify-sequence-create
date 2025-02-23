
import { useMutation } from "@tanstack/react-query"
import { Exercise } from "@/types/sequence"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"

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
      // Validate required fields
      if (!sessionContext.sport || !sessionContext.level) {
        throw new Error('Le sport et le niveau sont requis pour générer des alternatives')
      }

      // Use Supabase client to invoke the function
      const { data, error } = await supabase.functions.invoke(
        'generate-exercise-alternatives',
        {
          body: { exercise, sessionContext }
        }
      )

      if (error) {
        console.error('Edge function error:', error)
        throw new Error('Erreur lors de la génération des alternatives')
      }

      if (!data?.alternatives) {
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
