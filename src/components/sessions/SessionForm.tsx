
import { useState } from "react"
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
    }
  }

  const handleAIModeSelect = (mode: AIMode) => {
    setAIMode(mode)
    // Si on sélectionne un mode IA, on passe en mode avancé
    if (mode !== "manual") {
      setIsAdvancedMode(true)
    }
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
