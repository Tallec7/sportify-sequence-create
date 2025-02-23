
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { promptTemplateFormSchema, type PromptTemplateFormValues, type PromptTemplate } from "./types"

interface UsePromptTemplateProps {
  template: PromptTemplate | null
  onOpenChange: (open: boolean) => void
}

export const usePromptTemplate = ({ template, onOpenChange }: UsePromptTemplateProps) => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const form = useForm<PromptTemplateFormValues>({
    resolver: zodResolver(promptTemplateFormSchema),
    defaultValues: {
      sport_id: template?.sport_id || null,
      training_type: template?.training_type || "session_generation",
      prompt_text: template?.prompt_text || "Créer une séance d'entraînement complète avec...",
      is_active: template?.is_active ?? true,
      is_validated: template?.is_validated ?? false,
      is_default: template?.is_default ?? !template
    }
  })

  const mutation = useMutation({
    mutationFn: async (values: PromptTemplateFormValues) => {
      if (template?.id) {
        const { error } = await supabase
          .from("prompt_templates")
          .update({
            ...values,
            updated_at: new Date().toISOString()
          })
          .eq("id", template.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from("prompt_templates")
          .insert({
            ...values,
            created_at: new Date().toISOString()
          })

        if (error) throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prompt-templates"] })
      toast({
        title: "Success",
        description: `Template ${template ? "updated" : "created"} successfully`
      })
      onOpenChange(false)
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${template ? "update" : "create"} template: ${error.message}`
      })
    }
  })

  const handleSubmit = form.handleSubmit((values) => {
    mutation.mutate(values)
  })

  return {
    form,
    onSubmit: handleSubmit
  }
}

