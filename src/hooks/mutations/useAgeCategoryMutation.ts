
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"

export const useAgeCategoryMutation = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: async (values: { value: string; label: string }) => {
      const { error } = await supabase.from("age_categories").insert([values])
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["age-categories"] })
      toast({
        title: "Succès",
        description: "La catégorie d'âge a été ajoutée",
      })
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'ajouter la catégorie d'âge",
      })
    },
  })
}
