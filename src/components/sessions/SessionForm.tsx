
import { useState } from "react"
import { Alert } from "@/components/ui/alert"
import { type SessionFormData } from "@/hooks/mutations/useSessionMutation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SessionDetailsForm } from "./forms/SessionDetailsForm"
import { SessionBasicInfoForm } from "./forms/SessionBasicInfoForm"
import { SessionParticipantsForm } from "./forms/SessionParticipantsForm"
import { SessionModeToggle } from "./forms/SessionModeToggle"
import { SessionAISelector, type AIMode } from "./forms/SessionAISelector"
import { SessionExpressForm } from "./forms/SessionExpressForm"
import { SessionExpertForm } from "./forms/SessionExpertForm"
import { SessionCreativityForm } from "./forms/SessionCreativityForm"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"

interface SessionFormProps {
  formData: SessionFormData
  setFormData: (formData: SessionFormData) => void
  onSave: () => void
}

export const SessionForm = ({
  formData,
  setFormData,
  onSave,
}: SessionFormProps) => {
  const [isAdvancedMode, setIsAdvancedMode] = useState(false)
  const [aiMode, setAIMode] = useState<AIMode>("manual")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedSession, setGeneratedSession] = useState<string | null>(null)
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: parseInt(value),
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleModeChange = (advanced: boolean) => {
    setIsAdvancedMode(advanced)
    if (!advanced) {
      setAIMode("manual")
      setGeneratedSession(null)
    }
  }

  const handleAIModeSelect = (mode: AIMode) => {
    setAIMode(mode)
    setGeneratedSession(null)
    if (mode !== "manual") {
      setIsAdvancedMode(true)
    }
  }

  const validateFormData = () => {
    if (!formData.title?.trim()) {
      toast({
        variant: "destructive",
        title: "Erreur de validation",
        description: "Le titre de la séance est requis",
      })
      return false
    }

    if (!formData.sport?.trim()) {
      toast({
        variant: "destructive",
        title: "Erreur de validation",
        description: "Le sport est requis",
      })
      return false
    }

    if (!formData.level?.trim()) {
      toast({
        variant: "destructive",
        title: "Erreur de validation",
        description: "Le niveau est requis",
      })
      return false
    }

    return true
  }

  const handleGenerate = async (answers: any) => {
    try {
      setIsGenerating(true)
      const { data, error } = await supabase.functions.invoke('generate-session', {
        body: { mode: aiMode, answers }
      })

      if (error) throw error

      setGeneratedSession(data.session)
      
      // Pré-remplir le formulaire avec les informations de base
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

  const handleSave = () => {
    if (!validateFormData()) {
      return
    }
    onSave()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Détails de la séance</CardTitle>
        <CardDescription>
          Renseignez les informations générales de la séance.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <SessionModeToggle
          isAdvancedMode={isAdvancedMode}
          onModeChange={handleModeChange}
        />

        {isAdvancedMode && (
          <SessionAISelector
            selectedMode={aiMode}
            onModeSelect={handleAIModeSelect}
          />
        )}

        {aiMode === "express" && (
          <SessionExpressForm
            onGenerate={handleGenerate}
            isLoading={isGenerating}
          />
        )}

        {aiMode === "expert" && (
          <SessionExpertForm
            onGenerate={handleGenerate}
            isLoading={isGenerating}
          />
        )}

        {aiMode === "creativity" && (
          <SessionCreativityForm
            onGenerate={handleGenerate}
            isLoading={isGenerating}
          />
        )}

        {generatedSession && (
          <Alert className="my-4">
            <h3 className="font-semibold mb-2">Séance générée :</h3>
            <div className="whitespace-pre-wrap">{generatedSession}</div>
          </Alert>
        )}

        <SessionBasicInfoForm
          formData={formData}
          handleChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleNumberChange={handleNumberChange}
        />
        
        {(isAdvancedMode || aiMode === "expert") && (
          <SessionParticipantsForm
            formData={formData}
            handleNumberChange={handleNumberChange}
          />
        )}

        {(isAdvancedMode || aiMode !== "express") && (
          <SessionDetailsForm
            formData={formData}
            handleSelectChange={handleSelectChange}
            handleNumberChange={handleNumberChange}
          />
        )}
      </CardContent>
    </Card>
  )
}

export type { SessionFormData } from "@/hooks/mutations/useSessionMutation"
