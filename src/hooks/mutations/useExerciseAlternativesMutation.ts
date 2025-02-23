
import { useMutation } from "@tanstack/react-query"
import { Exercise } from "@/types/sequence"
import { useToast } from "@/components/ui/use-toast"

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
      const response = await fetch(
        'https://ldrowsmnqkiydtxpjhrt.supabase.co/functions/v1/generate-exercise-alternatives',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ exercise, sessionContext }),
        }
      )

      if (!response.ok) {
        throw new Error('Erreur lors de la génération des alternatives')
      }

      return response.json()
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
