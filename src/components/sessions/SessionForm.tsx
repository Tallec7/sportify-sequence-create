import { type SessionFormData } from "@/hooks/mutations/useSessionMutation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SessionDetailsForm } from "./forms/SessionDetailsForm"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: parseInt(value),
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
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
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base">Titre</Label>
            <Input
              id="title"
              name="title"
              type="text"
              className="h-12"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sport" className="text-base">Sport</Label>
            <Input
              id="sport"
              name="sport"
              type="text"
              className="h-12"
              value={formData.sport}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-base">Description</Label>
          <Input
            id="description"
            name="description"
            type="text"
            className="h-12"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

        <SessionDetailsForm
          formData={formData}
          handleSelectChange={handleSelectChange}
          handleNumberChange={handleNumberChange}
        />
      </CardContent>
    </Card>
  )
}
