
import { useParams, useNavigate } from "react-router-dom"
import { useSession } from "@/hooks/useSession"
import { useSessionDelete } from "@/hooks/useSessionDelete"
import { ViewSessionHeader } from "@/components/sessions/ViewSessionHeader"
import { ViewSessionSkeleton } from "@/components/sessions/ViewSessionSkeleton"
import { ViewSessionDetails } from "@/components/sessions/ViewSessionDetails"
import { ViewSessionSequences } from "@/components/sessions/ViewSessionSequences"

const ViewSession = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { formData, sequences, loading } = useSession(id)
  const { handleDelete } = useSessionDelete(id)

  if (loading) {
    return <ViewSessionSkeleton />
  }

  return (
    <div className="container py-8 space-y-8">
      <ViewSessionHeader
        formData={formData}
        onDelete={handleDelete}
        onEdit={() => navigate(`/editor/${id}`)}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Description</h2>
        <p className="text-muted-foreground">{formData.description || "Aucune description"}</p>
      </div>

      <ViewSessionDetails formData={formData} />
      <ViewSessionSequences sequences={sequences} />
    </div>
  )
}

export default ViewSession
