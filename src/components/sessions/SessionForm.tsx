
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
import { SessionObjectiveField } from "./forms/fields/SessionObjectiveField"
import { useSessionGeneration } from "./hooks/useSessionGeneration"
import { useFormHandlers } from "./hooks/useFormHandlers"
import { validateFormData } from "./utils/formValidation"

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
  
  const {
    isGenerating,
    generatedSession,
    handleGenerate,
    setGeneratedSession
  } = useSessionGeneration(formData, setFormData)

  const {
    handleInputChange,
    handleNumberChange,
    handleSelectChange,
  } = useFormHandlers(setFormData)

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

  const handleSave = () => {
    if (!validateFormData(formData)) {
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
        
        <SessionObjectiveField
          value={formData.objective}
          onChange={handleInputChange}
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
