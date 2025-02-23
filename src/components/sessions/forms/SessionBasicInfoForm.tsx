
import { SportSelect } from "./fields/SportSelect"
import { SessionTitleField } from "./fields/SessionTitleField"
import { SessionDescriptionField } from "./fields/SessionDescriptionField"
import { SessionObjectiveField } from "./fields/SessionObjectiveField"
import type { SessionFormData } from "@/types/settings"

interface SessionBasicInfoFormProps {
  formData: SessionFormData
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSelectChange: (name: string, value: string) => void
}

export const SessionBasicInfoForm = ({
  formData,
  handleChange,
  handleSelectChange,
}: SessionBasicInfoFormProps) => {
  return (
    <>
      <SessionTitleField
        value={formData.title}
        onChange={handleChange}
      />
      <SessionDescriptionField
        value={formData.description}
        onChange={handleChange}
      />
      <SessionObjectiveField
        value={formData.objective}
        onChange={handleChange}
      />
      <SportSelect
        value={formData.sport}
        onValueChange={(value) => handleSelectChange("sport", value)}
      />
    </>
  )
}
