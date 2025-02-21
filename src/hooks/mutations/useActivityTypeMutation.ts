
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"

export const useActivityTypeMutation = (onSuccess: () => void) => {
  const [isEditingType, setIsEditingType] = useState<string | null>(null)
  const [editedTypeValue, setEditedTypeValue] = useState("")
  const [editedTypeLabel, setEditedTypeLabel] = useState("")
  const [newTypeValue, setNewTypeValue] = useState("")
  const [newTypeLabel, setNewTypeLabel] = useState("")
  const { toast } = useToast()

  const handleAddType = async () => {
    if (!newTypeValue || !newTypeLabel) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez remplir tous les champs"
      })
      return
    }

    try {
      const { error } = await supabase
        .from('activity_types')
        .insert([{
          value: newTypeValue,
          label: newTypeLabel
        }])

      if (error) throw error

      toast({
        title: "Type d'activité ajouté",
        description: `Le type d'activité ${newTypeLabel} a été ajouté avec succès`
      })

      setNewTypeValue("")
      setNewTypeLabel("")
      onSuccess()
    } catch (error) {
      console.error('Error adding activity type:', error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'ajouter le type d'activité"
      })
    }
  }

  const handleEditType = async (id: string) => {
    if (!editedTypeValue || !editedTypeLabel) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez remplir tous les champs"
      })
      return
    }

    try {
      const { error } = await supabase
        .from('activity_types')
        .update({ value: editedTypeValue, label: editedTypeLabel })
        .eq('id', id)

      if (error) throw error

      toast({
        title: "Type d'activité modifié",
        description: `Le type d'activité a été modifié avec succès`
      })

      setIsEditingType(null)
      onSuccess()
    } catch (error) {
      console.error('Error updating activity type:', error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de modifier le type d'activité"
      })
    }
  }

  const handleDeleteType = async (id: string) => {
    try {
      const { error } = await supabase
        .from('activity_types')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast({
        title: "Type d'activité supprimé", 
        description: "Le type d'activité a été supprimé avec succès"
      })

      onSuccess()
    } catch (error) {
      console.error('Error deleting activity type:', error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de supprimer le type d'activité"
      })
    }
  }

  return {
    isEditingType,
    editedTypeValue,
    editedTypeLabel,
    newTypeValue,
    newTypeLabel,
    setIsEditingType,
    setEditedTypeValue,
    setEditedTypeLabel,
    setNewTypeValue,
    setNewTypeLabel,
    handleAddType,
    handleEditType,
    handleDeleteType,
  }
}
