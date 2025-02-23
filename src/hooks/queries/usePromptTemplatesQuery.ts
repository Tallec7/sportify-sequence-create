
import { useQuery } from "@tanstack/react-query"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import type { PromptTemplate } from "@/components/prompt-manager/types"

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

      let templates = data as PromptTemplate[]

      // Check if there's a default template
      if (!templates.find(template => template.is_default)) {
        // Create default template
        const defaultTemplate: PromptTemplate = {
          training_type: "session_generation",
          prompt_text: "Créer une séance d'entraînement complète avec...",
          is_active: true,
          is_validated: true,
          is_default: true,
          sport_id: null
        }

        const { error: insertError } = await supabase
          .from("prompt_templates")
          .insert([defaultTemplate])

        if (insertError) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to create default prompt template"
          })
          throw insertError
        }

        templates = [...templates, defaultTemplate]
      }

      return templates
    }
  })
}
