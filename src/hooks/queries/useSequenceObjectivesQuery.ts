
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import type { SequenceObjective } from "@/types/sequence"

export const useSequenceObjectivesQuery = (sequenceId: string | undefined) => {
  return useQuery({
    queryKey: ["sequence-objectives", sequenceId],
    queryFn: async () => {
      if (!sequenceId) return []

      const { data, error } = await supabase
        .from("sequence_objectives")
        .select("*")
        .eq("sequence_id", sequenceId)
        .order("order_index")

      if (error) throw error

      return data.map(obj => ({
        ...obj,
        type: obj.objective_type // Map objective_type to type
      })) as SequenceObjective[]
    },
    enabled: !!sequenceId
  })
}
