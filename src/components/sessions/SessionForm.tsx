
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Détails de la séance</CardTitle>
        <CardDescription>
          Renseignez les informations générales de la séance.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <SessionBasicInfoForm
          formData={formData}
          handleChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleNumberChange={handleNumberChange}
        />
        <SessionDetailsForm
          formData={formData}
          handleSelectChange={handleSelectChange}
          handleNumberChange={handleNumberChange}
        />
      </CardContent>
    </Card>
  )
}

// Re-export the SessionFormData type from useSessionMutation
export type { SessionFormData } from "@/hooks/mutations/useSessionMutation"
