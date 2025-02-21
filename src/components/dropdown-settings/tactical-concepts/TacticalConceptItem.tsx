
import { useState } from "react"
import { Pencil, Trash2, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { TacticalConceptOption } from "@/types/tactical-concepts"

interface TacticalConceptItemProps {
  concept: TacticalConceptOption
  onConceptsChange: () => void
}

export const TacticalConceptItem = ({ concept, onConceptsChange }: TacticalConceptItemProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedConceptValue, setEditedConceptValue] = useState(concept.value)
  const [editedConceptLabel, setEditedConceptLabel] = useState(concept.label)
  const { toast } = useToast()

  const handleEditConcept = async () => {
    if (!editedConceptValue || !editedConceptLabel) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez remplir tous les champs"
      })
      return
    }

    try {
      const { error } = await supabase
        .from('tactical_concepts')
        .update({ value: editedConceptValue, label: editedConceptLabel })
        .eq('id', concept.id)

      if (error) throw error

      toast({
        title: "Concept tactique modifié",
        description: `Le concept a été modifié avec succès`
      })

      setIsEditing(false)
      onConceptsChange()
    } catch (error) {
      console.error('Error updating tactical concept:', error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de modifier le concept tactique"
      })
    }
  }

  const handleDeleteConcept = async () => {
    try {
      const { error } = await supabase
        .from('tactical_concepts')
        .delete()
        .eq('id', concept.id)

      if (error) throw error

      toast({
        title: "Concept tactique supprimé",
        description: "Le concept tactique a été supprimé avec succès"
      })

      onConceptsChange()
    } catch (error) {
      console.error('Error deleting tactical concept:', error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de supprimer le concept tactique"
      })
    }
  }

  return (
    <div className="flex items-center justify-between p-2 rounded border bg-background">
      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <Input
            value={editedConceptValue}
            onChange={(e) => setEditedConceptValue(e.target.value)}
            placeholder="Identifiant unique"
            className="max-w-[200px]"
          />
          <Input
            value={editedConceptLabel}
            onChange={(e) => setEditedConceptLabel(e.target.value)}
            placeholder="Nom affiché"
          />
        </div>
      ) : (
        <span>{concept.label} ({concept.value})</span>
      )}
      <div className="flex gap-2">
        {isEditing ? (
          <>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleEditConcept}
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setIsEditing(true)
                setEditedConceptValue(concept.value)
                setEditedConceptLabel(concept.label)
              }}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="ghost">
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action est irréversible. Cela supprimera définitivement ce concept tactique.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleDeleteConcept}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Supprimer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
      </div>
    </div>
  )
}
