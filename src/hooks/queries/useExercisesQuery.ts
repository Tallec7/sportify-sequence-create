
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Exercise } from "@/components/sessions/ExerciseForm"

export const useExercisesQuery = (sequenceId: string | undefined) => {
  return useQuery({
    queryKey: ["exercises", sequenceId],
    queryFn: async () => {
      if (!sequenceId) throw new Error("Sequence ID is required")

      const { data, error } = await supabase
        .from("exercises")
        .select("*")
        .eq("sequence_id", sequenceId)
        .order("exercise_order", { ascending: true })

      if (error) throw error

      return data as Exercise[]
    },
    enabled: !!sequenceId
  })
}
