
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { useErrorToast } from "@/hooks/use-error-toast"
import { SessionFormData } from "@/components/sessions/SessionForm"
import { useSequenceLoader } from "./useSequenceLoader"

export const useSessionLoader = (id: string | undefined, userId: string | null) => {
  const navigate = useNavigate()
  const { showError } = useErrorToast()
  const { sequences, setSequences, loadSequences } = useSequenceLoader(id)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<SessionFormData>({
    title: "",
    description: "",
    sport: "",
    level: "",
    duration: 60,
    participants_min: 1,
    participants_max: 10,
    age_category: "",
    intensity_level: "medium",
    cycle_id: null
  })

  useEffect(() => {
    if (id && userId) {
      loadSession(id)
    }
  }, [id, userId])

  const loadSession = async (sessionId: string) => {
    try {
      setLoading(true)
      const { data: sessionData, error: sessionError } = await supabase
        .from('sessions')
        .select('*')
        .eq('id', sessionId)
        .single()

      if (sessionError) throw sessionError

      setFormData(sessionData)
      await loadSequences(sessionId)
    } catch (error: any) {
      showError(error, "Erreur lors du chargement")
      navigate("/dashboard")
    } finally {
      setLoading(false)
    }
  }

  return { formData, setFormData, sequences, setSequences, loading }
}
