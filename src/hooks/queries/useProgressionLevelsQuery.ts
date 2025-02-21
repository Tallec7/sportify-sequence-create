
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"

export const useProgressionLevelsQuery = () => {
  return useQuery({
    queryKey: ["progression-levels"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("progression_levels")
        .select("id, value, label")
        .order("label")

      if (error) throw error
      return data
    },
  })
}
