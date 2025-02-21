
import { useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"

type UseSessionDeleteOptions = {
  onSuccess?: (sessionId: string) => void
}

export const useSessionDelete = (options?: UseSessionDeleteOptions) => {
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleDelete = async (sessionId: string) => {
    try {
      const { error } = await supabase
        .from('sessions')
        .delete()
        .eq('id', sessionId)

      if (error) throw error

      toast({
        title: "Succès",
        description: "La séance a été supprimée avec succès.",
      })

      if (options?.onSuccess) {
        options.onSuccess(sessionId)
      } else {
        navigate("/dashboard")
      }
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
