
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"

export const useProgressionLevelMutation = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: async (values: { value: string; label: string }) => {
      const { error } = await supabase.from("progression_levels").insert([values])
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progression-levels"] })
      toast({
        title: "Succès",
        description: "Le niveau de progression a été ajouté",
      })
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'ajouter le niveau de progression",
      })
    },
  })
}
