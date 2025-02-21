
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { LevelItem } from "./levels/LevelItem"
import { AddLevelDialog } from "./levels/AddLevelDialog"

interface Level {
  id?: string
  value: string
  label: string
}

interface LevelsListProps {
  levels: Level[]
  onLevelsChange: () => void
}

export const LevelsList = ({ levels, onLevelsChange }: LevelsListProps) => {
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
        .from('levels')
        .insert([{
          value: newLevelValue,
          label: newLevelLabel
        }])

      if (error) throw error

      toast({
        title: "Niveau ajouté",
        description: `Le niveau ${newLevelLabel} a été ajouté avec succès`
      })

      setNewLevelValue("")
      setNewLevelLabel("")
      onLevelsChange()
    } catch (error) {
      console.error('Error adding level:', error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'ajouter le niveau"
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
        .from('levels')
        .update({ value: editedLevelValue, label: editedLevelLabel })
        .eq('id', id)

      if (error) throw error

      toast({
        title: "Niveau modifié",
        description: `Le niveau a été modifié avec succès`
      })

      setIsEditingLevel(null)
      onLevelsChange()
    } catch (error) {
      console.error('Error updating level:', error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de modifier le niveau"
      })
    }
  }

  const handleDeleteLevel = async (id: string) => {
    try {
      const { error } = await supabase
        .from('levels')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast({
        title: "Niveau supprimé",
        description: "Le niveau a été supprimé avec succès"
      })

      onLevelsChange()
    } catch (error) {
      console.error('Error deleting level:', error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de supprimer le niveau"
      })
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-4">
        <Label>Niveau de difficulté</Label>
        <AddLevelDialog
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
        {levels.map((level) => (
          <LevelItem
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
