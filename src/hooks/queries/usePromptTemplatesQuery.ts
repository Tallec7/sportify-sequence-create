
import { useQuery } from "@tanstack/react-query"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"

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

      return data
    }
  })
}
