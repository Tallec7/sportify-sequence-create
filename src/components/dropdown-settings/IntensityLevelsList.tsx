
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { IntensityLevelItem } from "./intensity-levels/IntensityLevelItem"
import { AddIntensityLevelDialog } from "./intensity-levels/AddIntensityLevelDialog"

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
        <AddIntensityLevelDialog
          newValue={newLevelValue}
          newLabel={newLevelLabel}
          onNewValueChange={setNewLevelValue}
          onNewLabelChange={setNewLevelLabel}
          onCancel={() => {
            setNewLevelValue("")
            setNewLevelLabel("")
          }}
          onAdd={handleAddLevel}
        />
      </div>

      <div className="space-y-2">
        {intensityLevels.map((level) => (
          <IntensityLevelItem
            key={level.id}
            level={level}
            isEditing={isEditingLevel === level.id}
            editedValue={editedLevelValue}
            editedLabel={editedLevelLabel}
            onEditValueChange={setEditedLevelValue}
            onEditLabelChange={setEditedLevelLabel}
            onStartEdit={() => {
              setIsEditingLevel(level.id!)
              setEditedLevelValue(level.value)
              setEditedLevelLabel(level.label)
            }}
            onCancelEdit={() => setIsEditingLevel(null)}
            onSaveEdit={() => handleEditLevel(level.id!)}
            onDelete={() => handleDeleteLevel(level.id!)}
          />
        ))}
      </div>
    </div>
  )
}

