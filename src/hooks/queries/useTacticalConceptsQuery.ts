
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { TacticalConceptOption } from "@/types/tactical-concepts"

export const useTacticalConceptsQuery = (sportValue: string) => {
  const { toast } = useToast()

  return useQuery({
    queryKey: ['tactical_concepts', sportValue],
    queryFn: async () => {
      try {
        const { data: sportData } = await supabase
          .from('sports')
          .select('id')
          .eq('value', sportValue)
          .single()

        if (sportData) {
          const { data, error } = await supabase
            .from('tactical_concepts')
            .select('id, value, label')
            .eq('sport_id', sportData.id)
            .order('label')

          if (error) throw error
          return data || []
        }
        return []
      } catch (error) {
        console.error('Error fetching tactical concepts:', error)
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de charger les concepts tactiques"
        })
        return []
      }
    }
  })
}
