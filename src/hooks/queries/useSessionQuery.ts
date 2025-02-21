
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"

export const useSessionQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: ["session", id],
    queryFn: async () => {
      if (!id) throw new Error("Session ID is required")
      
      const { data: sessionData, error: sessionError } = await supabase
        .from("sessions")
        .select("*")
        .eq("id", id)
        .maybeSingle()

      if (sessionError) throw sessionError
      if (!sessionData) throw new Error("Session not found")

      return sessionData
    },
    enabled: !!id,
  })
}
