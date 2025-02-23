
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"

export const useIntensityLevelsQuery = () => {
  return useQuery({
    queryKey: ["intensity_levels"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("intensity_levels")
        .select("id, value, label")
        .order("label")

      if (error) throw error
      return data
    },
  })
}
