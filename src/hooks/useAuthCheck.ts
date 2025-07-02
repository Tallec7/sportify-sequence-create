
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"

export const useAuthCheck = () => {
  const navigate = useNavigate()
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        // Bypass auth for development - uncomment next line to skip auth
        // navigate("/auth")
        // For development, set a fake user ID
        setUserId("dev-user-id")
      } else {
        setUserId(session.user.id)
      }
    }
    checkAuth()
  }, [navigate])

  return { userId }
}
