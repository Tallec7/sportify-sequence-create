
import { useParams, useNavigate } from "react-router-dom"
import { useSessionQuery } from "@/hooks/queries/useSessionQuery"
import { useSequencesQuery } from "@/hooks/queries/useSequencesQuery"
import { useSessionDelete } from "@/hooks/useSessionDelete"
import { ViewSessionHeader } from "@/components/sessions/ViewSessionHeader"
import { ViewSessionSkeleton } from "@/components/sessions/ViewSessionSkeleton"
import { ViewSessionDetails } from "@/components/sessions/ViewSessionDetails"
import { ViewSessionSequences } from "@/components/sessions/ViewSessionSequences"
import { toast } from "@/components/ui/use-toast"
import { type SessionFormData } from "@/types/settings"

const ViewSession = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { handleDelete } = useSessionDelete()

  const { 
    data: sessionData,
    isLoading: isLoadingSession,
    error: sessionError
  } = useSessionQuery(id)

  const {
    data: sequences = [],
    isLoading: isLoadingSequences,
    error: sequencesError
  } = useSequencesQuery(id)

  if (sessionError || sequencesError) {
    const error = sessionError || sequencesError
    console.error("Error loading session:", error)
    toast({
      variant: "destructive",
      title: "Erreur",
      description: "Impossible de charger la séance.",
    })
    navigate("/dashboard")
    return null
  }

  if (isLoadingSession || isLoadingSequences || !sessionData) {
    return <ViewSessionSkeleton />
  }

  const formattedSessionData: SessionFormData = {
    ...sessionData,
    objective: sessionData.objective || "",
    tactical_concepts: Array.isArray(sessionData.tactical_concepts) ? sessionData.tactical_concepts : [],
    decision_making_focus: Array.isArray(sessionData.decision_making_focus) ? sessionData.decision_making_focus : [],
    performance_metrics: Array.isArray(sessionData.performance_metrics) ? sessionData.performance_metrics : [],
    validation_feedback: sessionData.validation_feedback || "",
    expert_validated: sessionData.expert_validated || false,
    objectives: sessionData.objectives || []
  }

  return (
    <div className="container py-8 space-y-8">
      <ViewSessionHeader
        formData={formattedSessionData}
        onDelete={() => id && handleDelete(id)}
        onEdit={() => navigate(`/editor/${id}`)}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Description</h2>
        <p className="text-muted-foreground">{formattedSessionData.description || "Aucune description"}</p>
      </div>

      <ViewSessionDetails formData={formattedSessionData} />
      <ViewSessionSequences sequences={sequences} />
    </div>
  )
}

export default ViewSession

