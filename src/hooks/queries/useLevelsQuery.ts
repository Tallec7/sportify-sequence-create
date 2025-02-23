
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"

export interface Level {
  id: string
  value: string
  label: string
}

export const useLevelsQuery = () => {
  const { toast } = useToast()

  return useQuery({
    queryKey: ['levels'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('levels')
        .select('id, value, label')
        .order('label')

      if (error) {
        console.error('Error fetching levels:', error)
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de charger la liste des niveaux"
        })
        return []
      }

      return data || []
    }
  })
}
