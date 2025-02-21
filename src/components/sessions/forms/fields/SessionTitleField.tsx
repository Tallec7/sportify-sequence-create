
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface SessionTitleFieldProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const SessionTitleField = ({ value, onChange }: SessionTitleFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="title" className="text-base">Titre</Label>
      <Input
        id="title"
        name="title"
        value={value}
        onChange={onChange}
        placeholder="Titre de la séance"
        className="h-12"
        required
      />
    </div>
  )
}
