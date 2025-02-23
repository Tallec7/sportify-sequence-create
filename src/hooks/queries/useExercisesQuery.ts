
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Exercise } from "@/types/sequence"

export const useExercisesQuery = (sequenceId: string | undefined) => {
  return useQuery({
    queryKey: ["phases", sequenceId],
    queryFn: async () => {
      if (!sequenceId) throw new Error("Sequence ID is required")

      const { data, error } = await supabase
        .from("phases")
        .select("*")
        .eq("sequence_id", sequenceId)
        .order("exercise_order", { ascending: true })

      if (error) throw error

      return data as Exercise[]
    },
    enabled: !!sequenceId
  })
}
