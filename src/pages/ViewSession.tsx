
import { useParams, useNavigate } from "react-router-dom"
import { useSession } from "@/hooks/useSession"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

const ViewSession = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const { formData, sequences, loading } = useSession(id)

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('sessions')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast({
        title: "Succès",
        description: "La séance a été supprimée avec succès.",
      })
      navigate("/dashboard")
    } catch (error: any) {
      console.error("Error deleting session:", error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression de la séance.",
      })
    }
  }

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}min`
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return remainingMinutes > 0 ? `${hours}h${remainingMinutes}` : `${hours}h`
  }

  if (loading) {
    return (
      <div className="container py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-4">
            <Skeleton className="h-8 w-[250px]" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-[100px]" />
            <Skeleton className="h-10 w-[100px]" />
          </div>
        </div>

        <div className="space-y-4">
          <Skeleton className="h-8 w-[150px]" />
          <Skeleton className="h-20 w-full" />
        </div>

        <div className="space-y-4">
          <Skeleton className="h-8 w-[150px]" />
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Skeleton className="h-8 w-[150px]" />
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">{formData.title}</h1>
          <div className="flex gap-2">
            <Badge>{formData.sport}</Badge>
            <Badge variant="outline">{formData.level}</Badge>
            <Badge variant="secondary">{formatDuration(formData.duration)}</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/editor/${id}`)}
          >
            <Pencil className="w-4 h-4 mr-2" />
            Modifier
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Supprimer
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action est irréversible. La séance sera définitivement supprimée.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Supprimer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

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
          {sequences.map((sequence) => (
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

