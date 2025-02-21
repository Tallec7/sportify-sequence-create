
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"

export const useActivityTypesQuery = () => {
  return useQuery({
    queryKey: ["activity-types"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("activity_types")
        .select("id, value, label")
        .order("label")

      if (error) throw error
      return data
    },
  })
}
