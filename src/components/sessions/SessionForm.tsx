
import { SessionHeaderForm } from "./forms/SessionHeaderForm"
import { SessionBasicInfoForm } from "./forms/SessionBasicInfoForm"
import { SessionDetailsForm } from "./forms/SessionDetailsForm"
import { SessionParticipantsForm } from "./forms/SessionParticipantsForm"

export interface SessionFormData {
  title: string
  description: string
  sport: string
  level: string
  duration: number
  participants_min: number
  participants_max: number
  age_category: string
  intensity_level: string
  cycle_id?: string | null
}

interface SessionFormProps {
  onSave: () => void
  formData: SessionFormData
  setFormData: (data: SessionFormData) => void
}

export const SessionForm = ({ onSave, formData, setFormData }: SessionFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: parseInt(value) || 0
    })
  }

  return (
    <div className="container py-8">
      <SessionHeaderForm onSave={onSave} />
      <div className="rounded-xl border bg-card p-8 shadow-sm">
        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          <SessionBasicInfoForm
            formData={formData}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
            handleNumberChange={handleNumberChange}
          />
          <SessionDetailsForm
            formData={formData}
            handleSelectChange={handleSelectChange}
            handleNumberChange={handleNumberChange}
          />
          <SessionParticipantsForm
            formData={formData}
            handleNumberChange={handleNumberChange}
          />
        </form>
      </div>
    </div>
  )
}
