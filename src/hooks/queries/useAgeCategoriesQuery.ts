
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"

export const useAgeCategoriesQuery = () => {
  return useQuery({
    queryKey: ["age-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("age_categories")
        .select("id, value, label")
        .order("label")

      if (error) throw error
      return data
    },
  })
}

