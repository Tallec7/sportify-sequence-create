
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { type SessionFormData } from "@/hooks/mutations/useSessionMutation"

interface SessionDetailsFormProps {
  formData: SessionFormData
  handleSelectChange: (name: string, value: string) => void
  handleNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const SessionDetailsForm = ({
  formData,
  handleSelectChange,
  handleNumberChange,
}: SessionDetailsFormProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="level" className="text-base">Niveau</Label>
        <Select name="level" value={formData.level} onValueChange={(value) => handleSelectChange("level", value)}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Sélectionnez un niveau" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="debutant">Débutant</SelectItem>
            <SelectItem value="intermediaire">Intermédiaire</SelectItem>
            <SelectItem value="avance">Avancé</SelectItem>
            <SelectItem value="expert">Expert</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="age_category" className="text-base">Catégorie d'âge</Label>
        <Select 
          name="age_category" 
          value={formData.age_category} 
          onValueChange={(value) => handleSelectChange("age_category", value)}
        >
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Sélectionnez une catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="U9">U9</SelectItem>
            <SelectItem value="U11">U11</SelectItem>
            <SelectItem value="U13">U13</SelectItem>
            <SelectItem value="U15">U15</SelectItem>
            <SelectItem value="U17">U17</SelectItem>
            <SelectItem value="U19">U19</SelectItem>
            <SelectItem value="Senior">Senior</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="intensity_level" className="text-base">Intensité</Label>
        <Select 
          name="intensity_level" 
          value={formData.intensity_level} 
          onValueChange={(value) => handleSelectChange("intensity_level", value)}
        >
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Sélectionnez l'intensité" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Faible</SelectItem>
            <SelectItem value="medium">Moyenne</SelectItem>
            <SelectItem value="high">Élevée</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="duration" className="text-base">Durée (minutes)</Label>
        <Input
          id="duration"
          name="duration"
          type="number"
          min="1"
          className="h-12"
          value={formData.duration}
          onChange={handleNumberChange}
          required
        />
      </div>
    </div>
  )
}
