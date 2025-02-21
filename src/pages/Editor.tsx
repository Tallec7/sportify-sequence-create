
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { SessionForm, SessionFormData } from "@/components/sessions/SessionForm"
import { motion } from "framer-motion"

const Editor = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [userId, setUserId] = useState<string | null>(null)
  const [formData, setFormData] = useState<SessionFormData>({
    title: "",
    description: "",
    sport: "",
    level: "",
    duration: 60,
    participants_min: 1,
    participants_max: 10,
    age_category: "",
    intensity_level: "medium",
    cycle_id: null
  })

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        navigate("/auth")
      } else {
        setUserId(session.user.id)
      }
    }
    checkAuth()
  }, [navigate])

  const handleSave = async () => {
    try {
      const { data, error } = await supabase
        .from('sessions')
        .insert([
          {
            ...formData,
            user_id: userId
          }
        ])
        .select()
        .single()

      if (error) throw error

      toast({
        title: "Succès",
        description: "La séance a été sauvegardée avec succès.",
      })
      navigate("/dashboard")
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message,
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SessionForm
        onSave={handleSave}
        formData={formData}
        setFormData={setFormData}
      />
    </motion.div>
  )
}

export default Editor
