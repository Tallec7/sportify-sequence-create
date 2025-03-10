
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { Sequence } from "@/types/sequence"

export const useSequenceOrderMutation = (sessionId: string | undefined) => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (sequences: Sequence[]) => {
      if (!sessionId) throw new Error("Session ID is required")

      console.log("Updating sequence order:", sequences.map(s => ({ id: s.id, order: s.sequence_order })))

      const updatePromises = sequences.map((sequence, index) =>
        supabase
          .from("session_sequences")
          .update({ sequence_order: index + 1 })
          .eq("id", sequence.id)
      )

      await Promise.all(updatePromises)
    },
    onSuccess: () => {
      toast({
        title: "Succès",
        description: "L'ordre des séquences a été mis à jour.",
      })
      queryClient.invalidateQueries({ queryKey: ["sequences", sessionId] })
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour de l'ordre des séquences.",
      })
      console.error("Erreur mutation ordre des séquences:", error)
    }
  })
}
