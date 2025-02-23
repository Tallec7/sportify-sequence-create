
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import type { PromptTemplate } from "@/components/prompt-manager/types"

export const usePromptTemplateDeleteMutation = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (template: PromptTemplate) => {
      if (template.is_default) {
        throw new Error("Les prompts système protégés ne peuvent pas être supprimés")
      }

      const { error } = await supabase
        .from("prompt_templates")
        .delete()
        .eq("id", template.id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prompt-templates"] })
      toast({
        title: "Succès",
        description: "Le prompt a été supprimé"
      })
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message
      })
    }
  })
}
