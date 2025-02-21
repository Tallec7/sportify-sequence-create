
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { SequenceObjective } from "@/types/sequence"

export const useSequenceObjectivesQuery = (sequenceId: string | undefined) => {
  return useQuery({
    queryKey: ["sequence-objectives", sequenceId],
    queryFn: async () => {
      if (!sequenceId) throw new Error("Sequence ID is required")

      const { data, error } = await supabase
        .from("sequence_objectives")
        .select("*")
        .eq("sequence_id", sequenceId)
        .order("order_index", { ascending: true })

      if (error) throw error

      return data as SequenceObjective[]
    },
    enabled: !!sequenceId
  })
}
