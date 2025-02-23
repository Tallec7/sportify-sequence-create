
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"

export interface Sport {
  id: string
  value: string
  label: string
}

export const useSportsQuery = () => {
  const { toast } = useToast()

  return useQuery({
    queryKey: ['sports'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sports')
        .select('id, value, label')
        .order('label')

      if (error) {
        console.error('Error fetching sports:', error)
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de charger la liste des sports"
        })
        return []
      }

      return data || []
    }
  })
}
