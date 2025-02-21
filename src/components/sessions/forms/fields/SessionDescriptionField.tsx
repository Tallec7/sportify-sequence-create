
import { Label } from "@/components/ui/label"

interface SessionDescriptionFieldProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const SessionDescriptionField = ({ value, onChange }: SessionDescriptionFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="description" className="text-base">Description</Label>
      <textarea
        id="description"
        name="description"
        value={value}
        onChange={onChange}
        placeholder="Description détaillée de la séance"
        className="w-full min-h-[150px] rounded-md border border-input bg-background px-4 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
      />
    </div>
  )
}
