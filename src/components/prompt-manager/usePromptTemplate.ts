
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { promptTemplateFormSchema, type PromptTemplateFormValues, type PromptTemplate } from "./types"
import { logPromptError } from "@/utils/promptErrorHandler"

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
      training_type: template?.training_type || "",
      mode: template?.mode || "express",
      prompt_text: template?.prompt_text || "",
      is_active: template?.is_active ?? true,
      is_validated: template?.is_validated ?? false,
      is_default: template?.is_default ?? false
    }
  })

  const mutation = useMutation({
    mutationFn: async (values: PromptTemplateFormValues) => {
      const timestamp = new Date().toISOString()
      
      // Purger le cache via un edge function dédié
      try {
        await supabase.functions.invoke('clear-prompt-cache', {
          body: { template_type: values.training_type }
        })
      } catch (error) {
        console.error('Failed to clear prompt cache:', error)
        await logPromptError({
          training_type: values.training_type,
          mode: values.mode,
          error_type: "template_not_found",
          details: { error: error.message }
        })
      }
      
      if (template?.id) {
        const { error } = await supabase
          .from("prompt_templates")
          .update({
            ...values,
            updated_at: timestamp,
            prompt_text: values.prompt_text,
            training_type: values.training_type,
            mode: values.mode
          })
          .eq("id", template.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from("prompt_templates")
          .insert({
            ...values,
            created_at: timestamp,
            prompt_text: values.prompt_text,
            training_type: values.training_type,
            mode: values.mode
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
    onError: async (error) => {
      if (form.getValues().training_type) {
        await logPromptError({
          training_type: form.getValues().training_type,
          mode: form.getValues().mode || "express",
          error_type: "validation_error",
          details: { error: error.message }
        })
      }
      
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${template ? "update" : "create"} template: ${error.message}`
      })
    }
  })

  const handleSubmit = (values: PromptTemplateFormValues) => {
    mutation.mutate(values)
  }

  return {
    form,
    onSubmit: handleSubmit
  }
}
