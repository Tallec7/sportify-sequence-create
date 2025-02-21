
import { useParams, useNavigate } from "react-router-dom"
import { useSession } from "@/hooks/useSession"
import { useSessionDelete } from "@/hooks/useSessionDelete"
import { ViewSessionHeader } from "@/components/sessions/ViewSessionHeader"
import { ViewSessionSkeleton } from "@/components/sessions/ViewSessionSkeleton"
import { Badge } from "@/components/ui/badge"
import { Sequence } from "@/types/sequence"

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

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Détails</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="font-medium mb-2">Participants</h3>
            <p className="text-muted-foreground">
              {formData.participants_min === formData.participants_max 
                ? `${formData.participants_min} participants`
                : `${formData.participants_min}-${formData.participants_max} participants`
              }
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Catégorie d'âge</h3>
            <p className="text-muted-foreground">
              {formData.age_category || "Non spécifié"}
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Intensité</h3>
            <p className="text-muted-foreground">
              {formData.intensity_level === "low" ? "Faible" 
                : formData.intensity_level === "medium" ? "Moyenne" 
                : "Élevée"}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Séquences</h2>
        <div className="grid gap-4">
          {sequences.map((sequence: Sequence) => (
            <div key={sequence.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{sequence.title}</h3>
                <Badge>
                  {sequence.sequence_type === "warmup" ? "Échauffement"
                    : sequence.sequence_type === "main" ? "Principal"
                    : "Retour au calme"}
                </Badge>
              </div>
              <p className="text-muted-foreground mb-2">{sequence.description}</p>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>Durée: {sequence.duration}min</span>
                <span>Intensité: {
                  sequence.intensity_level === "low" ? "Faible"
                    : sequence.intensity_level === "medium" ? "Moyenne"
                    : "Élevée"
                }</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ViewSession
