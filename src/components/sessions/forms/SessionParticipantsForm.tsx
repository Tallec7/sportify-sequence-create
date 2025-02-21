
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SessionFormData } from "../SessionForm"

interface SessionParticipantsFormProps {
  formData: SessionFormData
  handleNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const SessionParticipantsForm = ({
  formData,
  handleNumberChange,
}: SessionParticipantsFormProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="participants_min" className="text-base">Nombre minimum de participants</Label>
        <Input
          id="participants_min"
          name="participants_min"
          type="number"
          min="1"
          className="h-12"
          value={formData.participants_min}
          onChange={handleNumberChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="participants_max" className="text-base">Nombre maximum de participants</Label>
        <Input
          id="participants_max"
          name="participants_max"
          type="number"
          min="1"
          className="h-12"
          value={formData.participants_max}
          onChange={handleNumberChange}
          required
        />
      </div>
    </div>
  )
}
