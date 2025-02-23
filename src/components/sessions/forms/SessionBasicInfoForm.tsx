import { SessionFormData } from '@/types/settings'
import { SessionTitleField } from "./fields/SessionTitleField"
import { SportSelect } from "./fields/SportSelect"
import { SessionDescriptionField } from "./fields/SessionDescriptionField"

interface SessionBasicInfoFormProps {
  formData: SessionFormData
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSelectChange: (name: string, value: string) => void
  handleNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const SessionBasicInfoForm = ({
  formData,
  handleChange,
  handleSelectChange,
}: SessionBasicInfoFormProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <SessionTitleField 
        value={formData.title}
        onChange={handleChange}
      />
      <SportSelect
        value={formData.sport}
        onValueChange={(value) => handleSelectChange("sport", value)}
      />
      <div className="md:col-span-2">
        <SessionDescriptionField
          value={formData.description}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}
