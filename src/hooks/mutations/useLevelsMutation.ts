
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { Level } from "@/types/settings"

export const useLevelsMutation = (onSuccess: () => void) => {
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
      onSuccess()
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
      onSuccess()
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

      onSuccess()
    } catch (error) {
      console.error('Error deleting level:', error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de supprimer le niveau"
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
