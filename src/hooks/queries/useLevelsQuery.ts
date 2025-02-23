
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { Level } from "@/types/settings"

export const useLevelsQuery = () => {
  const { toast } = useToast()

  return useQuery<Level[]>({
    queryKey: ['levels'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('levels')
        .select(`
          id,
          value,
          label,
          label_fr,
          label_en,
          is_default,
          last_modified_by,
          last_modified_at
        `)
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
