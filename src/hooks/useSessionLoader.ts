
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { Sequence } from "@/types/sequence"
import { SessionFormData } from "@/components/sessions/SessionForm"

export const useSessionLoader = (id: string | undefined, userId: string | null) => {
  const navigate = useNavigate()
  const { toast } = useToast()
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
  const [sequences, setSequences] = useState<Sequence[]>([])

  useEffect(() => {
    if (id && userId) {
      loadSession(id)
    }
  }, [id, userId])

  const loadSession = async (sessionId: string) => {
    try {
      const { data: sessionData, error: sessionError } = await supabase
        .from('sessions')
        .select('*')
        .eq('id', sessionId)
        .single()

      if (sessionError) throw sessionError

      const { data: sequencesData, error: sequencesError } = await supabase
        .from('session_sequences')
        .select('*')
        .eq('session_id', sessionId)
        .order('sequence_order', { ascending: true })

      if (sequencesError) throw sequencesError

      setFormData(sessionData)
      
      const validatedSequences = sequencesData.map(sequence => {
        const validSequenceType = sequence.sequence_type.toLowerCase() as "warmup" | "main" | "cooldown"
        if (!["warmup", "main", "cooldown"].includes(validSequenceType)) {
          throw new Error(`Invalid sequence type: ${sequence.sequence_type}`)
        }
        return {
          id: sequence.id,
          title: sequence.title,
          description: sequence.description,
          duration: sequence.duration,
          sequence_type: validSequenceType,
          intensity_level: sequence.intensity_level,
          sequence_order: sequence.sequence_order,
          session_id: sequence.session_id
        } satisfies Sequence
      })

      setSequences(validatedSequences)
    } catch (error: any) {
      console.error("Error loading session:", error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger la séance.",
      })
      navigate("/dashboard")
    }
  }

  return { formData, setFormData, sequences, setSequences }
}
