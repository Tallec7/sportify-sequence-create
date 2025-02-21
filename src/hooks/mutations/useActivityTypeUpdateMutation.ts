
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"

export const useActivityTypeUpdateMutation = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: async (values: { id: string; value: string; label: string }) => {
      const { error } = await supabase
        .from("activity_types")
        .update({ value: values.value, label: values.label })
        .eq("id", values.id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activity-types"] })
      toast({
        title: "Succès",
        description: "Le type d'activité a été modifié",
      })
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de modifier le type d'activité",
      })
    },
  })
}
