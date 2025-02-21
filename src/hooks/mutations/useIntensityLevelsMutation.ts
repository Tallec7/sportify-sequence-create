
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { IntensityLevel } from "@/types/settings"

export const useIntensityLevelsMutation = (onSuccess: () => void) => {
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
      onSuccess()
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
      onSuccess()
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

      onSuccess()
    } catch (error) {
      console.error('Error deleting intensity level:', error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de supprimer le niveau d'intensité"
      })
    }
  }

  return {
    isEditingLevel,
    editedLevelValue,
    editedLevelLabel,
    newLevelValue,
    newLevelLabel,
    setIsEditingLevel,
    setEditedLevelValue,
    setEditedLevelLabel,
    setNewLevelValue,
    setNewLevelLabel,
    handleAddLevel,
    handleEditLevel,
    handleDeleteLevel,
  }
}
