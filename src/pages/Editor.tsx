import { useParams } from "react-router-dom"
import { SessionForm } from "@/components/sessions/SessionForm"
import { SequenceForm } from "@/components/sessions/SequenceForm"
import { motion } from "framer-motion"
import { useAuthCheck } from "@/hooks/useAuthCheck"
import { useSessionQuery } from "@/hooks/queries/useSessionQuery"
import { useSequencesQuery } from "@/hooks/queries/useSequencesQuery"
import { useSessionMutation } from "@/hooks/mutations/useSessionMutation"
import { useSequenceMutation } from "@/hooks/mutations/useSequenceMutation"
import { useSequenceOrderMutation } from "@/hooks/mutations/useSequenceOrderMutation"
import { useEffect, useState } from "react"
import { SessionFormData } from "@/components/sessions/SessionForm"
import { Sequence } from "@/types/sequence"
import { EditorHeader } from "@/components/sessions/EditorHeader"

const Editor = () => {
  const { id } = useParams()
  const { userId } = useAuthCheck()
  
  // Queries
  const { data: sessionData, isLoading: isLoadingSession } = useSessionQuery(id)
  const { data: sequences = [], isLoading: isLoadingSequences } = useSequencesQuery(id)
  
  // Local state
  const [formData, setFormData] = useState<SessionFormData>({
    title: "",
    description: "",
    sport: "",
    level: "",
    duration: 60,
    participants_min: 1,
    participants_max: 10,
    age_category: "U13",
    intensity_level: "medium",
    cycle_id: null,
    objective: ""
  })

  // Update form data when session data is loaded
  useEffect(() => {
    if (sessionData) {
      setFormData({
        title: sessionData.title || "",
        description: sessionData.description || "",
        sport: sessionData.sport || "",
        level: sessionData.level || "",
        duration: sessionData.duration || 60,
        participants_min: sessionData.participants_min || 1,
        participants_max: sessionData.participants_max || 10,
        age_category: sessionData.age_category || "U13",
        intensity_level: sessionData.intensity_level || "medium",
        cycle_id: sessionData.cycle_id || null,
        objective: sessionData.objective || ""
      })
    }
  }, [sessionData])

  // Mutations
  const sessionMutation = useSessionMutation(id, userId)
  const sequenceMutation = useSequenceMutation(id)
  const sequenceOrderMutation = useSequenceOrderMutation(id)

  // Handlers
  const handleSave = () => {
    sessionMutation.mutate(formData)
  }

  const handleAddSequence = (sequence: Sequence) => {
    sequenceMutation.mutate(sequence)
  }

  const handleReorderSequences = (reorderedSequences: Sequence[]) => {
    sequenceOrderMutation.mutate(reorderedSequences)
  }

  const isLoading = isLoadingSession || isLoadingSequences

  return (
    <>
      <EditorHeader
        isLoading={isLoading}
        onSave={handleSave}
        sessionId={id}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container py-8 space-y-8"
      >
        {isLoading ? (
          <div className="space-y-8">
            <div className="h-[400px] animate-pulse rounded-xl border bg-muted" />
            <div className="h-[600px] animate-pulse rounded-xl border bg-muted" />
          </div>
        ) : (
          <>
            <SessionForm
              onSave={handleSave}
              formData={formData}
              setFormData={setFormData}
            />
            <SequenceForm
              sequences={sequences}
              onAddSequence={handleAddSequence}
              onReorderSequences={handleReorderSequences}
            />
          </>
        )}
      </motion.div>
    </>
  )
}

export default Editor
