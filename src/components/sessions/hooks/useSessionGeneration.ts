
import { useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { AIMode } from "../forms/SessionAISelector"
import { SessionFormData } from "@/hooks/mutations/useSessionMutation"

export const useSessionGeneration = (formData: SessionFormData, setFormData: (data: SessionFormData) => void) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedSession, setGeneratedSession] = useState<string | null>(null)
  const { toast } = useToast()

  const handleGenerate = async (answers: any) => {
    try {
      setIsGenerating(true)
      const { data, error } = await supabase.functions.invoke('generate-session', {
        body: { mode: answers.mode, answers }
      })

      if (error) throw error

      setGeneratedSession(data.session)
      
      setFormData({
        ...formData,
        sport: answers.sport,
        level: answers.level,
        duration: parseInt(answers.duration),
        participants_min: parseInt(answers.participants || "1"),
        participants_max: parseInt(answers.participants || "10"),
        age_category: answers.ageCategory || "U13",
      })
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la génération",
      })
      console.error(error)
    } finally {
      setIsGenerating(false)
    }
  }

  return {
    isGenerating,
    generatedSession,
    handleGenerate,
    setGeneratedSession
  }
}
