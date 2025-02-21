
import { useState } from "react"
import { Plus, Pencil, Trash2, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TacticalConceptOption {
  id?: string
  value: string
  label: string
  sport_id?: string
}

interface Sport {
  id?: string
  value: string
  label: string
}

interface TacticalConceptsListProps {
  sports: Sport[]
  selectedSport: string
  tacticalConcepts: TacticalConceptOption[]
  onSportChange: (value: string) => void
  onConceptsChange: () => void
}

export const TacticalConceptsList = ({ 
  sports, 
  selectedSport, 
  tacticalConcepts, 
  onSportChange,
  onConceptsChange 
}: TacticalConceptsListProps) => {
  const [isEditingConcept, setIsEditingConcept] = useState<string | null>(null)
  const [editedConceptValue, setEditedConceptValue] = useState("")
  const [editedConceptLabel, setEditedConceptLabel] = useState("")
  const [newConceptValue, setNewConceptValue] = useState("")
  const [newConceptLabel, setNewConceptLabel] = useState("")
  const [isAddingConcept, setIsAddingConcept] = useState(false)
  const { toast } = useToast()

  const handleAddConcept = async () => {
    if (!newConceptValue || !newConceptLabel || !selectedSport) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez remplir tous les champs et sélectionner un sport"
      })
      return
    }

    try {
      const { data: sportData } = await supabase
        .from('sports')
        .select('id')
        .eq('value', selectedSport)
        .single()

      if (!sportData) throw new Error("Sport non trouvé")

      const { error } = await supabase
        .from('tactical_concepts')
        .insert([{
          value: newConceptValue,
          label: newConceptLabel,
          sport_id: sportData.id
        }])

      if (error) throw error

      toast({
        title: "Concept tactique ajouté",
        description: `Le concept ${newConceptLabel} a été ajouté avec succès`
      })

      setNewConceptValue("")
      setNewConceptLabel("")
      setIsAddingConcept(false)
      onConceptsChange()
    } catch (error) {
      console.error('Error adding tactical concept:', error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'ajouter le concept tactique"
      })
    }
  }

  const handleEditConcept = async (id: string) => {
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
        .eq('id', id)

      if (error) throw error

      toast({
        title: "Concept tactique modifié",
        description: `Le concept a été modifié avec succès`
      })

      setIsEditingConcept(null)
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

  const handleDeleteConcept = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tactical_concepts')
        .delete()
        .eq('id', id)

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
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-4">
        <Label>Concept tactique</Label>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={() => setIsAddingConcept(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un concept
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau concept tactique</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Identifiant unique</Label>
                <Input
                  value={newConceptValue}
                  onChange={(e) => setNewConceptValue(e.target.value)}
                  placeholder="defense_zone"
                />
              </div>
              <div>
                <Label>Nom affiché</Label>
                <Input
                  value={newConceptLabel}
                  onChange={(e) => setNewConceptLabel(e.target.value)}
                  placeholder="Défense de zone"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddingConcept(false)}>
                  Annuler
                </Button>
                <Button onClick={handleAddConcept}>
                  Ajouter
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Select
        value={selectedSport}
        onValueChange={onSportChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Sélectionnez un sport" />
        </SelectTrigger>
        <SelectContent>
          {sports.map((sport) => (
            <SelectItem key={sport.value} value={sport.value}>
              {sport.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="space-y-2 mt-4">
        {tacticalConcepts.map((concept) => (
          <div key={concept.id} className="flex items-center justify-between p-2 rounded border bg-background">
            {isEditingConcept === concept.id ? (
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
              {isEditingConcept === concept.id ? (
                <>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEditConcept(concept.id!)}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsEditingConcept(null)}
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
                      setIsEditingConcept(concept.id!)
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
                          onClick={() => handleDeleteConcept(concept.id!)}
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
        ))}
      </div>
    </div>
  )
}
