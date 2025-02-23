
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { Level } from "@/types/settings"

export const useLevelsMutation = (onSuccess: () => void) => {
  const [isEditingLevel, setIsEditingLevel] = useState<string | null>(null)
  const [editedLevelValue, setEditedLevelValue] = useState("")
  const [editedLevelLabel, setEditedLevelLabel] = useState("")
  const [editedLevelLabelFr, setEditedLevelLabelFr] = useState("")
  const [editedLevelLabelEn, setEditedLevelLabelEn] = useState("")
  const { toast } = useToast()

  const handleAddLevel = async (values: {
    value: string
    label: string
    label_fr: string
    label_en: string
  }) => {
    try {
      const { error } = await supabase
        .from('levels')
        .insert([{
          value: values.value,
          label: values.label,
          label_fr: values.label_fr,
          label_en: values.label_en,
        }])

      if (error) throw error

      toast({
        title: "Niveau ajouté",
        description: "Le niveau a été ajouté avec succès"
      })

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

  const handleUpdateLevel = async (id: string, values: {
    value: string
    label: string
    label_fr: string
    label_en: string
  }) => {
    try {
      const { error } = await supabase
        .from('levels')
        .update({
          value: values.value,
          label: values.label,
          label_fr: values.label_fr,
          label_en: values.label_en,
          last_modified_at: new Date().toISOString()
        })
        .eq('id', id)

      if (error) throw error

      toast({
        title: "Niveau modifié",
        description: "Le niveau a été modifié avec succès"
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
    editedLevelLabelFr,
    editedLevelLabelEn,
    setIsEditingLevel,
    setEditedLevelValue,
    setEditedLevelLabel,
    setEditedLevelLabelFr,
    setEditedLevelLabelEn,
    handleAddLevel,
    handleUpdateLevel,
    handleDeleteLevel,
  }
}
