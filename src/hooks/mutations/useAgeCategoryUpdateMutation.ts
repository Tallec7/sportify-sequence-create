
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"

export const useAgeCategoryUpdateMutation = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: async (values: { id: string; value: string; label: string }) => {
      const { error } = await supabase
        .from("age_categories")
        .update({ value: values.value, label: values.label })
        .eq("id", values.id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["age-categories"] })
      toast({
        title: "Succès",
        description: "La catégorie d'âge a été modifiée",
      })
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de modifier la catégorie d'âge",
      })
    },
  })
}
