
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "@/components/ui/use-toast"

export const useSequenceTypesQuery = () => {
  return useQuery({
    queryKey: ["sequence_types"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sequence_types")
        .select("id, value, label")
        .order("label")

      if (error) {
        console.error("Error fetching sequence types:", error)
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de charger les types de séquence"
        })
        throw error
      }

      return data
    }
  })
}
