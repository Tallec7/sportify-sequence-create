
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"

export interface IntensityLevel {
  id: string
  value: string
  label: string
}

export const useIntensityLevelsQuery = () => {
  const { toast } = useToast()

  return useQuery({
    queryKey: ['intensity_levels'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('intensity_levels')
        .select('id, value, label')
        .order('label')

      if (error) {
        console.error('Error fetching intensity levels:', error)
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de charger la liste des niveaux d'intensité"
        })
        return []
      }

      return data || []
    }
  })
}
