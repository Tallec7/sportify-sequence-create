
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { Sequence } from "@/types/sequence"

export const useSequenceMutation = (sessionId: string | undefined) => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (sequence: Sequence) => {
      if (!sessionId) throw new Error("Session ID is required")

      const { data, error } = await supabase
        .from("session_sequences")
        .insert([{
          ...sequence,
          session_id: sessionId,
        }])
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      toast({
        title: "Succès",
        description: "La séquence a été ajoutée avec succès.",
      })
      queryClient.invalidateQueries({ queryKey: ["sequences", sessionId] })
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout de la séquence.",
      })
      console.error("Erreur mutation séquence:", error)
    }
  })
}
