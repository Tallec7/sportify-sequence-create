
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

export type PaginationState = {
  currentPage: number
  totalPages: number
  itemsPerPage: number
  totalItems: number
}

export const useSessionsQuery = (userId: string | undefined) => {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 9,
    totalItems: 0
  })

  useEffect(() => {
    if (userId) {
      fetchSessions(userId, pagination.currentPage)
    }
  }, [userId, pagination.currentPage])

  const fetchSessions = async (userId: string, page: number) => {
    try {
      setLoading(true)
      const start = (page - 1) * pagination.itemsPerPage
      const end = start + pagination.itemsPerPage - 1

      // Fetch total count
      const { count } = await supabase
        .from('sessions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)

      // Fetch paginated data
      const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .range(start, end)

      if (error) throw error

      setSessions(data)
      setPagination(prev => ({
        ...prev,
        totalItems: count || 0,
        totalPages: Math.ceil((count || 0) / pagination.itemsPerPage)
      }))
    } catch (error) {
      console.error("Error fetching sessions:", error)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, currentPage: page }))
  }

  return { sessions, loading, setSessions, pagination, handlePageChange }
}

