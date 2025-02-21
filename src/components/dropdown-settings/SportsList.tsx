
import { useState } from "react"
import { Plus, Pencil, Trash2, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"

interface Sport {
  id?: string
  value: string
  label: string
}

interface SportsListProps {
  sports: Sport[]
  onSportsChange: () => void
}

export const SportsList = ({ sports, onSportsChange }: SportsListProps) => {
  const [isEditingSport, setIsEditingSport] = useState<string | null>(null)
  const [editedSportValue, setEditedSportValue] = useState("")
  const [editedSportLabel, setEditedSportLabel] = useState("")
  const [newSportValue, setNewSportValue] = useState("")
  const [newSportLabel, setNewSportLabel] = useState("")
  const [isAddingSport, setIsAddingSport] = useState(false)
  const { toast } = useToast()

  const handleAddSport = async () => {
    if (!newSportValue || !newSportLabel) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez remplir tous les champs"
      })
      return
    }

    try {
      const { error } = await supabase
        .from('sports')
        .insert([{ value: newSportValue, label: newSportLabel }])

      if (error) throw error

      toast({
        title: "Sport ajouté",
        description: `Le sport ${newSportLabel} a été ajouté avec succès`
      })

      setNewSportValue("")
      setNewSportLabel("")
      setIsAddingSport(false)
      onSportsChange()
    } catch (error) {
      console.error('Error adding sport:', error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'ajouter le sport"
      })
    }
  }

  const handleEditSport = async (id: string) => {
    if (!editedSportValue || !editedSportLabel) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez remplir tous les champs"
      })
      return
    }

    try {
      const { error } = await supabase
        .from('sports')
        .update({ value: editedSportValue, label: editedSportLabel })
        .eq('id', id)

      if (error) throw error

      toast({
        title: "Sport modifié",
        description: `Le sport a été modifié avec succès`
      })

      setIsEditingSport(null)
      onSportsChange()
    } catch (error) {
      console.error('Error updating sport:', error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de modifier le sport"
      })
    }
  }

  const handleDeleteSport = async (id: string) => {
    try {
      const { error } = await supabase
        .from('sports')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast({
        title: "Sport supprimé",
        description: "Le sport a été supprimé avec succès"
      })

      onSportsChange()
    } catch (error) {
      console.error('Error deleting sport:', error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de supprimer le sport"
      })
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-4">
        <Label>Sports</Label>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={() => setIsAddingSport(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un sport
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau sport</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Identifiant unique</Label>
                <Input
                  value={newSportValue}
                  onChange={(e) => setNewSportValue(e.target.value)}
                  placeholder="handball"
                />
              </div>
              <div>
                <Label>Nom affiché</Label>
                <Input
                  value={newSportLabel}
                  onChange={(e) => setNewSportLabel(e.target.value)}
                  placeholder="Handball"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddingSport(false)}>
                  Annuler
                </Button>
                <Button onClick={handleAddSport}>
                  Ajouter
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-2">
        {sports.map((sport) => (
          <div key={sport.id} className="flex items-center justify-between p-2 rounded border bg-background">
            {isEditingSport === sport.id ? (
              <div className="flex-1 flex gap-2">
                <Input
                  value={editedSportValue}
                  onChange={(e) => setEditedSportValue(e.target.value)}
                  placeholder="Identifiant unique"
                  className="max-w-[200px]"
                />
                <Input
                  value={editedSportLabel}
                  onChange={(e) => setEditedSportLabel(e.target.value)}
                  placeholder="Nom affiché"
                />
              </div>
            ) : (
              <span>{sport.label} ({sport.value})</span>
            )}
            <div className="flex gap-2">
              {isEditingSport === sport.id ? (
                <>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEditSport(sport.id!)}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsEditingSport(null)}
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
                      setIsEditingSport(sport.id!)
                      setEditedSportValue(sport.value)
                      setEditedSportLabel(sport.label)
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
                          Cette action est irréversible. Cela supprimera définitivement le sport
                          et tous les concepts tactiques associés.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => handleDeleteSport(sport.id!)}
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
