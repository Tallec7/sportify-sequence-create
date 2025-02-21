
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SessionFormData } from "../SessionForm"

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
  handleNumberChange,
}: SessionBasicInfoFormProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-base">Titre</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Titre de la séance"
          className="h-12"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="sport" className="text-base">Sport</Label>
        <Select name="sport" onValueChange={(value) => handleSelectChange("sport", value)}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Sélectionnez un sport" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="football">Football</SelectItem>
            <SelectItem value="basketball">Basketball</SelectItem>
            <SelectItem value="tennis">Tennis</SelectItem>
            <SelectItem value="athletisme">Athlétisme</SelectItem>
            <SelectItem value="handball">Handball</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description" className="text-base">Description</Label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description détaillée de la séance"
          className="w-full min-h-[150px] rounded-md border border-input bg-background px-4 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
        />
      </div>
    </div>
  )
}
