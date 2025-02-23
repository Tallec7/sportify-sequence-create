
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { type AgeCategory } from "@/types/settings"

export const useAgeCategoriesQuery = () => {
  return useQuery<AgeCategory[]>({
    queryKey: ["age-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("age_categories")
        .select("id, value, label")
        .order("label")

      if (error) {
        console.error("Error fetching age categories:", error)
        throw error
      }

      return data
    }
  })
}
