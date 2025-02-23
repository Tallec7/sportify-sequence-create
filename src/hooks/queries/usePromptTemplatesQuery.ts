
import { useQuery } from "@tanstack/react-query"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { PromptTemplate } from "@/types/settings"

export const usePromptTemplatesQuery = () => {
  const { toast } = useToast()

  return useQuery({
    queryKey: ["prompt-templates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("prompt_templates")
        .select(`
          *,
          sports (
            label
          )
        `)
        .order("created_at", { ascending: false })

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load prompt templates"
        })
        throw error
      }

      if (!data.find(template => template.is_default)) {
        // Si aucun prompt par défaut n'existe, créer un prompt par défaut
        const defaultPrompt: Partial<PromptTemplate> = {
          training_type: "session_generation",
          prompt_text: "Créer une séance d'entraînement complète avec...",
          is_active: true,
          is_validated: true,
          is_default: true
        }

        const { error: insertError } = await supabase
          .from("prompt_templates")
          .insert([defaultPrompt])

        if (insertError) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to create default prompt template"
          })
          throw insertError
        }

        return [...data, defaultPrompt] as PromptTemplate[]
      }

      return data as PromptTemplate[]
    }
  })
}
