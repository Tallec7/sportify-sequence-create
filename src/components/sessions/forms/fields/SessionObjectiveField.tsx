
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface SessionObjectiveFieldProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const SessionObjectiveField = ({ value, onChange }: SessionObjectiveFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="objective">Objectif de la séance</Label>
      <Textarea
        id="objective"
        name="objective"
        value={value}
        onChange={onChange}
        className="min-h-[100px] resize-y"
        placeholder="Définissez l'objectif principal de cette séance..."
        required
      />
    </div>
  )
}
