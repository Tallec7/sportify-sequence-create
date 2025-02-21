
import { useEffect, useState } from "react"
import { supabase } from "@/integrations/supabase/client"

export type Session = {
  id: string
  title: string
  description: string | null
  sport: string
  level: string
  duration: number
  participants_min: number
  participants_max: number
  created_at: string
}

export const useSessionsQuery = (userId: string | undefined) => {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userId) {
      fetchSessions(userId)
    }
  }, [userId])

  const fetchSessions = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error

      setSessions(data)
    } catch (error) {
      console.error("Error fetching sessions:", error)
    } finally {
      setLoading(false)
    }
  }

  return { sessions, loading, setSessions }
}
