
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
      console.log("Starting save process with sequences:", sequences)

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

      if (sessionError) {
        console.error("Error saving session:", sessionError)
        throw sessionError
      }

      console.log("Session saved successfully:", sessionData)

      // Ensure sequences have valid sequence_type values before saving
      const validatedSequences = sequences.map(sequence => {
        const sequenceType = sequence.sequence_type.toLowerCase()
        console.log("Validating sequence type:", sequenceType)
        return {
          ...sequence,
          sequence_type: sequenceType as "warmup" | "main" | "cooldown",
          session_id: sessionData.id,
        }
      })

      // Validate sequence types
      const validTypes = ['warmup', 'main', 'cooldown']
      const invalidSequences = validatedSequences.filter(seq => !validTypes.includes(seq.sequence_type))
      
      if (invalidSequences.length > 0) {
        console.error("Invalid sequence types found:", invalidSequences)
        throw new Error(`Types de séquence invalides détectés : ${invalidSequences.map(seq => seq.sequence_type).join(', ')}. Les types autorisés sont : warmup, main, cooldown.`)
      }

      // Then save all sequences
      if (validatedSequences.length > 0) {
        console.log("Attempting to save sequences:", validatedSequences)
        
        const { error: sequencesError } = await supabase
          .from('session_sequences')
          .insert(validatedSequences)

        if (sequencesError) {
          console.error("Error saving sequences:", sequencesError)
          throw sequencesError
        }

        console.log("Sequences saved successfully")
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
