
import { useAuthCheck } from "./useAuthCheck"
import { useSessionLoader } from "./useSessionLoader"
import { useSessionSaver } from "./useSessionSaver"
import { Sequence } from "@/types/sequence"

export const useSession = (id: string | undefined) => {
  const { userId } = useAuthCheck()
  const { formData, setFormData, sequences, setSequences } = useSessionLoader(id, userId)
  const { handleSave } = useSessionSaver(id, userId)

  const handleAddSequence = (sequence: Sequence) => {
    console.log("Adding new sequence:", sequence)
    setSequences([...sequences, sequence])
  }

  return {
    userId,
    sequences,
    formData,
    setFormData,
    handleSave: () => handleSave(formData, sequences),
    handleAddSequence
  }
}

