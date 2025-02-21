
import { useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"

export const useSessionDelete = (id: string | undefined) => {
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleDelete = async () => {
    if (!id) return

    try {
      const { error } = await supabase
        .from('sessions')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast({
        title: "Succès",
        description: "La séance a été supprimée avec succès.",
      })
      navigate("/dashboard")
    } catch (error: any) {
      console.error("Error deleting session:", error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression de la séance.",
      })
    }
  }

  return { handleDelete }
}
