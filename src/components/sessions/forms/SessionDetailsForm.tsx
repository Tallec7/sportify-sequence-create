
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { type SessionFormData } from "@/types/settings"
import { useLevelsQuery } from "@/hooks/queries/useLevelsQuery"
import { useIntensityLevelsQuery } from "@/hooks/queries/useIntensityLevelsQuery"
import { useAgeCategoriesQuery } from "@/hooks/queries/useAgeCategoriesQuery"

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
  const { data: levels = [] } = useLevelsQuery()
  const { data: intensityLevels = [] } = useIntensityLevelsQuery()
  const { data: ageCategories = [] } = useAgeCategoriesQuery()

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="level" className="text-base">Niveau</Label>
        <Select 
          name="level" 
          value={formData.level || ""} 
          onValueChange={(value) => handleSelectChange("level", value)}
        >
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Sélectionnez un niveau" />
          </SelectTrigger>
          <SelectContent>
            {levels.map((level) => (
              <SelectItem key={level.id} value={level.value}>
                {level.label}
              </SelectItem>
            ))}
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
            {ageCategories.map((category) => (
              <SelectItem key={category.id} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="intensity_level" className="text-base">Intensité</Label>
        <Select 
          name="intensity_level" 
          value={formData.intensity_level || ""} 
          onValueChange={(value) => handleSelectChange("intensity_level", value)}
        >
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Sélectionnez l'intensité" />
          </SelectTrigger>
          <SelectContent>
            {intensityLevels.map((level) => (
              <SelectItem key={level.id} value={level.value}>
                {level.label}
              </SelectItem>
            ))}
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
