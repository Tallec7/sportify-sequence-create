
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { SessionForm, SessionFormData } from "@/components/sessions/SessionForm"
import { SequenceForm } from "@/components/sessions/SequenceForm"
import { Sequence } from "@/types/sequence"
import { motion } from "framer-motion"

const Editor = () => {
  const navigate = useNavigate()
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
      }
    }
    checkAuth()
  }, [navigate])

  const handleSave = async () => {
    try {
      // Save the session first
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

      if (sessionError) throw sessionError

      // Ensure sequences have valid sequence_type values before saving
      const validatedSequences = sequences.map(sequence => ({
        ...sequence,
        sequence_type: sequence.sequence_type.toLowerCase() as "warmup" | "main" | "cooldown",
        session_id: sessionData.id,
      }))

      // Validate sequence types
      if (!validatedSequences.every(seq => ['warmup', 'main', 'cooldown'].includes(seq.sequence_type))) {
        throw new Error("Invalid sequence type. Must be 'warmup', 'main', or 'cooldown'")
      }

      // Then save all sequences
      if (validatedSequences.length > 0) {
        const { error: sequencesError } = await supabase
          .from('session_sequences')
          .insert(validatedSequences)

        if (sequencesError) throw sequencesError
      }

      toast({
        title: "Succès",
        description: "La séance a été sauvegardée avec succès.",
      })
      navigate("/dashboard")
    } catch (error: any) {
      console.error("Save error:", error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message,
      })
    }
  }

  const handleAddSequence = (sequence: Sequence) => {
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
