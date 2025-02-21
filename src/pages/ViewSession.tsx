
import { useParams, useNavigate } from "react-router-dom"
import { useSessionQuery } from "@/hooks/queries/useSessionQuery"
import { useSequencesQuery } from "@/hooks/queries/useSequencesQuery"
import { useSessionDelete } from "@/hooks/useSessionDelete"
import { ViewSessionHeader } from "@/components/sessions/ViewSessionHeader"
import { ViewSessionSkeleton } from "@/components/sessions/ViewSessionSkeleton"
import { ViewSessionDetails } from "@/components/sessions/ViewSessionDetails"
import { ViewSessionSequences } from "@/components/sessions/ViewSessionSequences"
import { toast } from "@/components/ui/use-toast"

const ViewSession = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { handleDelete } = useSessionDelete()

  const { 
    data: formData,
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

  if (isLoadingSession || isLoadingSequences || !formData) {
    return <ViewSessionSkeleton />
  }

  return (
    <div className="container py-8 space-y-8">
      <ViewSessionHeader
        formData={formData}
        onDelete={() => id && handleDelete(id)}
        onEdit={() => navigate(`/editor/${id}`)}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Description</h2>
        <p className="text-muted-foreground">{formData.description || "Aucune description"}</p>
      </div>

      <ViewSessionDetails formData={formData} />
      <ViewSessionSequences sequences={sequences} />
    </div>
  );
};

export default ViewSession;
