
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { SessionForm, SessionFormData } from "@/components/sessions/SessionForm"
import { SequenceForm } from "@/components/sessions/SequenceForm"
import { Sequence } from "@/types/sequence"
import { motion } from "framer-motion"

const Editor = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { toast } = useToast()
  const [userId, setUserId] = useState<string | null>(null)
  const [sequences, setSequences] = useState<Sequence[]>([])
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
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        navigate("/auth")
      } else {
        setUserId(session.user.id)
        if (id) {
          loadSession(id)
        }
      }
    }
    checkAuth()
  }, [navigate, id])

  const loadSession = async (sessionId: string) => {
    try {
      // Load session data
      const { data: sessionData, error: sessionError } = await supabase
        .from('sessions')
        .select('*')
        .eq('id', sessionId)
        .single()

      if (sessionError) throw sessionError

      // Load sequences
      const { data: sequencesData, error: sequencesError } = await supabase
        .from('session_sequences')
        .select('*')
        .eq('session_id', sessionId)
        .order('sequence_order', { ascending: true })

      if (sequencesError) throw sequencesError

      setFormData(sessionData)
      
      // Validate and transform sequence data to match Sequence type
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

  const handleSave = async () => {
    try {
      console.log("Starting save process with sequences:", sequences)

      if (id) {
        // Update existing session
        const { error: sessionError } = await supabase
          .from('sessions')
          .update({
            ...formData,
            user_id: userId
          })
          .eq('id', id)

        if (sessionError) {
          console.error("Error updating session:", sessionError)
          throw sessionError
        }

        // Delete existing sequences
        const { error: deleteError } = await supabase
          .from('session_sequences')
          .delete()
          .eq('session_id', id)

        if (deleteError) {
          console.error("Error deleting sequences:", deleteError)
          throw deleteError
        }

        // Add new sequences
        if (sequences.length > 0) {
          const validatedSequences = sequences.map(sequence => ({
            ...sequence,
            sequence_type: sequence.sequence_type.toLowerCase() as "warmup" | "main" | "cooldown",
            session_id: id,
          }))

          const { error: sequencesError } = await supabase
            .from('session_sequences')
            .insert(validatedSequences)

          if (sequencesError) {
            console.error("Error saving sequences:", sequencesError)
            throw sequencesError
          }
        }
      } else {
        // Create new session
        const { data: sessionData, error: sessionError } = await supabase
          .from('sessions')
          .insert([
            {
              ...formData,
              user_id: userId
            }
          ])
          .select()
          .single()

        if (sessionError) {
          console.error("Error saving session:", sessionError)
          throw sessionError
        }

        console.log("Session saved successfully:", sessionData)

        // Save sequences for new session
        if (sequences.length > 0) {
          const validatedSequences = sequences.map(sequence => ({
            ...sequence,
            sequence_type: sequence.sequence_type.toLowerCase() as "warmup" | "main" | "cooldown",
            session_id: sessionData.id,
          }))

          const { error: sequencesError } = await supabase
            .from('session_sequences')
            .insert(validatedSequences)

          if (sequencesError) {
            console.error("Error saving sequences:", sequencesError)
            throw sequencesError
          }
        }
      }

      toast({
        title: "Succès",
        description: `La séance a été ${id ? 'modifiée' : 'créée'} avec succès.`,
      })
      navigate("/dashboard")
    } catch (error: any) {
      console.error("Save error:", error)
      toast({
        variant: "destructive",
        title: "Erreur lors de la sauvegarde",
        description: error.message || "Une erreur est survenue lors de la sauvegarde de la séance.",
      })
    }
  }

  const handleAddSequence = (sequence: Sequence) => {
    console.log("Adding new sequence:", sequence)
    setSequences([...sequences, sequence])
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container py-8 space-y-8"
    >
      <SessionForm
        onSave={handleSave}
        formData={formData}
        setFormData={setFormData}
      />
      <SequenceForm
        sequences={sequences}
        onAddSequence={handleAddSequence}
      />
    </motion.div>
  )
}

export default Editor
