
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { Sport } from "@/types/tactical-concepts"

export const useSportMutation = (onSportsChange: () => void) => {
  const { toast } = useToast()

  const addSport = async (value: string, label: string) => {
    try {
      const { error } = await supabase
        .from('sports')
        .insert([{ value, label }])

      if (error) throw error

      toast({
        title: "Sport ajouté",
        description: `Le sport ${label} a été ajouté avec succès`
      })

      onSportsChange()
      return true
    } catch (error) {
      console.error('Error adding sport:', error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'ajouter le sport"
      })
      return false
    }
  }

  const updateSport = async (id: string, value: string, label: string) => {
    try {
      const { error } = await supabase
        .from('sports')
        .update({ value, label })
        .eq('id', id)

      if (error) throw error

      toast({
        title: "Sport modifié",
        description: `Le sport a été modifié avec succès`
      })

      onSportsChange()
      return true
    } catch (error) {
      console.error('Error updating sport:', error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de modifier le sport"
      })
      return false
    }
  }

  const deleteSport = async (id: string) => {
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
      return true
    } catch (error) {
      console.error('Error deleting sport:', error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de supprimer le sport"
      })
      return false
    }
  }

  return {
    addSport,
    updateSport,
    deleteSport
  }
}
