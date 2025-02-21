
import { useParams } from "react-router-dom"
import { SessionForm } from "@/components/sessions/SessionForm"
import { SequenceForm } from "@/components/sessions/SequenceForm"
import { motion } from "framer-motion"
import { useSession } from "@/hooks/useSession"

const Editor = () => {
  const { id } = useParams()
  const {
    formData,
    setFormData,
    sequences,
    handleSave,
    handleAddSequence
  } = useSession(id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container py-8 space-y-8"
    >
      <SessionForm
        onSave={handleSave}
        formData={formData}
        setFormData={setFormData}
      />
      <SequenceForm
        sequences={sequences}
        onAddSequence={handleAddSequence}
      />
    </motion.div>
  )
}

export default Editor
