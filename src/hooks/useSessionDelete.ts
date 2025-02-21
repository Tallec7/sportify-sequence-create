
import { useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { useErrorToast } from "@/hooks/use-error-toast"
import { supabase } from "@/integrations/supabase/client"

type UseSessionDeleteOptions = {
  onSuccess?: (sessionId: string) => void
}

export const useSessionDelete = (options?: UseSessionDeleteOptions) => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { showError } = useErrorToast()

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
      showError(error, "Erreur lors de la suppression")
    }
  }

  return { handleDelete }
}
