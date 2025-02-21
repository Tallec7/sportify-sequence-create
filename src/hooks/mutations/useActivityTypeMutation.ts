
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface ActivityTypeValues {
  value: string
  label: string
}

export const useActivityTypeMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const { mutate: handleAddType, isPending: isAddingType } = useMutation({
    mutationFn: async (values: ActivityTypeValues) => {
      const { error } = await supabase
        .from("activity_types")
        .insert([values])
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activity-types"] })
      toast({
        title: "Type d'activité ajouté",
        description: "Le type d'activité a été ajouté avec succès"
      })
      onSuccess?.()
    },
    onError: (error) => {
      console.error("Error adding activity type:", error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'ajouter le type d'activité"
      })
    }
  })

  return {
    handleAddType,
    isAddingType
  }
}
