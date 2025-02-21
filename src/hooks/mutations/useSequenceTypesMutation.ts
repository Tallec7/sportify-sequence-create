
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"

export const useSequenceTypesMutation = (onSuccess: () => void) => {
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
        .from('sequence_types')
        .insert([{
          value: newTypeValue,
          label: newTypeLabel
        }])

      if (error) throw error

      toast({
        title: "Type de séquence ajouté",
        description: `Le type de séquence ${newTypeLabel} a été ajouté avec succès`
      })

      setNewTypeValue("")
      setNewTypeLabel("")
      onSuccess()
    } catch (error) {
      console.error('Error adding sequence type:', error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'ajouter le type de séquence"
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
        .from('sequence_types')
        .update({ value: editedTypeValue, label: editedTypeLabel })
        .eq('id', id)

      if (error) throw error

      toast({
        title: "Type de séquence modifié",
        description: `Le type de séquence a été modifié avec succès`
      })

      setIsEditingType(null)
      onSuccess()
    } catch (error) {
      console.error('Error updating sequence type:', error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de modifier le type de séquence"
      })
    }
  }

  const handleDeleteType = async (id: string) => {
    try {
      const { error } = await supabase
        .from('sequence_types')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast({
        title: "Type de séquence supprimé",
        description: "Le type de séquence a été supprimé avec succès"
      })

      onSuccess()
    } catch (error) {
      console.error('Error deleting sequence type:', error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de supprimer le type de séquence"
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
