
import { SessionFormData } from "@/types/settings"
import { SessionBasicInfoForm } from "./forms/SessionBasicInfoForm"
import { SessionDetailsForm } from "./forms/SessionDetailsForm"
import { SessionObjectivesForm } from "./forms/SessionObjectivesForm"
import { SessionParticipantsForm } from "./forms/SessionParticipantsForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SessionFormProps {
  onSave: () => void
  formData: SessionFormData
  setFormData: (formData: SessionFormData) => void
}

export const SessionForm = ({ formData, setFormData }: SessionFormProps) => {
  // Handlers for form changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: Number(value),
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Informations de base</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <SessionBasicInfoForm
            formData={formData}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Détails de la séance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <SessionDetailsForm
            formData={formData}
            handleSelectChange={handleSelectChange}
            handleNumberChange={handleNumberChange}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Participants</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <SessionParticipantsForm
            formData={formData}
            handleNumberChange={handleNumberChange}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Objectifs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <SessionObjectivesForm
            formData={formData}
            handleSelectChange={handleSelectChange}
            handleTextChange={handleChange}
          />
        </CardContent>
      </Card>
    </div>
  )
}
