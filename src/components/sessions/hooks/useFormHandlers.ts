
import { SessionFormData } from "@/types/settings"

export const useFormHandlers = (setFormData: (data: SessionFormData | ((prev: SessionFormData) => SessionFormData)) => void) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev: SessionFormData) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev: SessionFormData) => ({
      ...prev,
      [name]: parseInt(value),
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev: SessionFormData) => ({
      ...prev,
      [name]: value,
    }))
  }

  return {
    handleInputChange,
    handleNumberChange,
    handleSelectChange,
  }
}

