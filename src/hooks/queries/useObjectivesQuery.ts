
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Database } from "@/integrations/supabase/types"

type ObjectiveType = Database["public"]["Enums"]["objective_type_enum"]

export interface SessionObjective {
  id: string
  description: string
  type: string
  is_priority: boolean
  order_index: number
  objective_type: ObjectiveType
  session_id: string
}

export const useObjectivesQuery = (sessionId: string | undefined) => {
  return useQuery({
    queryKey: ["objectives", sessionId],
    queryFn: async () => {
      if (!sessionId) throw new Error("Session ID is required")

      const { data: objectives, error } = await supabase
        .from("session_objectives")
        .select("*")
        .eq("session_id", sessionId)
        .order("order_index")

      if (error) throw error

      return objectives as SessionObjective[]
    },
    enabled: !!sessionId,
  })
}
