import { useState } from "react"
import { Edit2, Save, X, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { TacticalConceptOption } from "@/types/tactical-concepts"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"

interface TacticalConceptItemProps {
  concept: TacticalConceptOption
  onConceptsChange: () => void
}

export const TacticalConceptItem = ({ concept, onConceptsChange }: TacticalConceptItemProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedValue, setEditedValue] = useState(concept.value)
  const [editedLabel, setEditedLabel] = useState(concept.label)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleSaveEdit = async () => {
    if (!editedValue || !editedLabel) {
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
        .update({ value: editedValue, label: editedLabel })
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
    <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
      {isEditing ? (
        <div className="flex-1 flex gap-3">
          <Input
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            placeholder="Code unique"
            className="max-w-[200px]"
          />
          <Input
            value={editedLabel}
            onChange={(e) => setEditedLabel(e.target.value)}
            placeholder="Nom affiché"
          />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="font-medium">{concept.label}</span>
          <span className="text-sm text-muted-foreground">({concept.value})</span>
        </div>
      )}
      
      <div className="flex items-center gap-2">
        {isEditing ? (
          <>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleSaveEdit}
              className="hover:bg-primary/10"
            >
              <Save className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(false)}
              className="hover:bg-destructive/10"
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
                setIsEditing(true);
                setEditedValue(concept.value);
                setEditedLabel(concept.label);
              }}
              className="hover:bg-primary/10"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsDeleteDialogOpen(true)}
              className="hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </>
        )}
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action ne peut pas être annulée. Ce concept tactique sera définitivement supprimé.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => {
                handleDeleteConcept()
                setIsDeleteDialogOpen(false);
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
