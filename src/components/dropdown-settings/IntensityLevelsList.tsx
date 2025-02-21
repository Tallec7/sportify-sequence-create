
import { useState } from "react"
import { Plus, Pencil, Trash2, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"

interface IntensityLevel {
  id?: string
  value: string
  label: string
}

interface IntensityLevelsListProps {
  intensityLevels: IntensityLevel[]
  onIntensityLevelsChange: () => void
}

export const IntensityLevelsList = ({ intensityLevels, onIntensityLevelsChange }: IntensityLevelsListProps) => {
  const [isEditingLevel, setIsEditingLevel] = useState<string | null>(null)
  const [editedLevelValue, setEditedLevelValue] = useState("")
  const [editedLevelLabel, setEditedLevelLabel] = useState("")
  const [newLevelValue, setNewLevelValue] = useState("")
  const [newLevelLabel, setNewLevelLabel] = useState("")
  const [isAddingLevel, setIsAddingLevel] = useState(false)
  const { toast } = useToast()

  const handleAddLevel = async () => {
    if (!newLevelValue || !newLevelLabel) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez remplir tous les champs"
      })
      return
    }

    try {
      const { error } = await supabase
        .from('intensity_levels')
        .insert([{
          value: newLevelValue,
          label: newLevelLabel
        }])

      if (error) throw error

      toast({
        title: "Niveau d'intensité ajouté",
        description: `Le niveau d'intensité ${newLevelLabel} a été ajouté avec succès`
      })

      setNewLevelValue("")
      setNewLevelLabel("")
      setIsAddingLevel(false)
      onIntensityLevelsChange()
    } catch (error) {
      console.error('Error adding intensity level:', error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'ajouter le niveau d'intensité"
      })
    }
  }

  const handleEditLevel = async (id: string) => {
    if (!editedLevelValue || !editedLevelLabel) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez remplir tous les champs"
      })
      return
    }

    try {
      const { error } = await supabase
        .from('intensity_levels')
        .update({ value: editedLevelValue, label: editedLevelLabel })
        .eq('id', id)

      if (error) throw error

      toast({
        title: "Niveau d'intensité modifié",
        description: `Le niveau d'intensité a été modifié avec succès`
      })

      setIsEditingLevel(null)
      onIntensityLevelsChange()
    } catch (error) {
      console.error('Error updating intensity level:', error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de modifier le niveau d'intensité"
      })
    }
  }

  const handleDeleteLevel = async (id: string) => {
    try {
      const { error } = await supabase
        .from('intensity_levels')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast({
        title: "Niveau d'intensité supprimé",
        description: "Le niveau d'intensité a été supprimé avec succès"
      })

      onIntensityLevelsChange()
    } catch (error) {
      console.error('Error deleting intensity level:', error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de supprimer le niveau d'intensité"
      })
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-4">
        <Label>Niveau d'intensité</Label>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={() => setIsAddingLevel(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un niveau d'intensité
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau niveau d'intensité</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Identifiant unique</Label>
                <Input
                  value={newLevelValue}
                  onChange={(e) => setNewLevelValue(e.target.value)}
                  placeholder="faible"
                />
              </div>
              <div>
                <Label>Nom affiché</Label>
                <Input
                  value={newLevelLabel}
                  onChange={(e) => setNewLevelLabel(e.target.value)}
                  placeholder="Faible"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddingLevel(false)}>
                  Annuler
                </Button>
                <Button onClick={handleAddLevel}>
                  Ajouter
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-2">
        {intensityLevels.map((level) => (
          <div key={level.id} className="flex items-center justify-between p-2 rounded border bg-background">
            {isEditingLevel === level.id ? (
              <div className="flex-1 flex gap-2">
                <Input
                  value={editedLevelValue}
                  onChange={(e) => setEditedLevelValue(e.target.value)}
                  placeholder="Identifiant unique"
                  className="max-w-[200px]"
                />
                <Input
                  value={editedLevelLabel}
                  onChange={(e) => setEditedLevelLabel(e.target.value)}
                  placeholder="Nom affiché"
                />
              </div>
            ) : (
              <span>{level.label} ({level.value})</span>
            )}
            <div className="flex gap-2">
              {isEditingLevel === level.id ? (
                <>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEditLevel(level.id!)}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsEditingLevel(null)}
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
                      setIsEditingLevel(level.id!)
                      setEditedLevelValue(level.value)
                      setEditedLevelLabel(level.label)
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
                          Cette action est irréversible. Cela supprimera définitivement ce niveau d'intensité.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => handleDeleteLevel(level.id!)}
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
