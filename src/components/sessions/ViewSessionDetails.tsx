
import { SessionFormData } from "@/types/settings"

interface ViewSessionDetailsProps {
  formData: SessionFormData
}

export const ViewSessionDetails = ({ formData }: ViewSessionDetailsProps) => {
  return (
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
  )
}

