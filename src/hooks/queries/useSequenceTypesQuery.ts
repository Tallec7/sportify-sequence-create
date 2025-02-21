
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { SequenceType } from "@/types/settings"

export const useSequenceTypesQuery = () => {
  const { toast } = useToast()

  const { data: sequenceTypes = [] } = useQuery({
    queryKey: ['sequence_types'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sequence_types')
        .select('id, value, label')
        .order('label')

      if (error) {
        console.error('Error fetching sequence types:', error)
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de charger les types de séquence"
        })
        return []
      }

      return data as SequenceType[]
    }
  })

  return sequenceTypes
}
