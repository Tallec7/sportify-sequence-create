
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"

export const useActivityTypeMutation = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: async (values: { value: string; label: string }) => {
      const { error } = await supabase.from("activity_types").insert([values])
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activity-types"] })
      toast({
        title: "Succès",
        description: "Le type d'activité a été ajouté",
      })
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'ajouter le type d'activité",
      })
    },
  })
}
