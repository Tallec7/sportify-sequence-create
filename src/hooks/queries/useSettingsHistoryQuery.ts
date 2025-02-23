
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"

interface SettingsHistoryEntry {
  id: string
  table_name: string
  record_id: string
  modified_by: string
  modified_at: string
  old_values: Record<string, any>
  new_values: Record<string, any>
}

export const useSettingsHistoryQuery = (tableName?: string) => {
  const { toast } = useToast()

  return useQuery({
    queryKey: ["settings-history", tableName],
    queryFn: async () => {
      let query = supabase
        .from("settings_history")
        .select("*")
        .order("modified_at", { ascending: false })

      if (tableName) {
        query = query.eq("table_name", tableName)
      }

      const { data, error } = await query

      if (error) {
        console.error("Error fetching settings history:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not load settings history"
        })
        return []
      }

      return data as SettingsHistoryEntry[]
    },
    staleTime: 1000 * 60 * 5 // Consider data fresh for 5 minutes
  })
}
