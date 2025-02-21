
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useSportsQuery } from "@/hooks/queries/useSportsQuery"

interface SportSelectProps {
  value: string
  onValueChange: (value: string) => void
}

export const SportSelect = ({ value, onValueChange }: SportSelectProps) => {
  const sports = useSportsQuery()

  return (
    <div className="space-y-2">
      <Label htmlFor="sport" className="text-base">Sport</Label>
      <Select 
        name="sport" 
        value={value || ""} 
        onValueChange={onValueChange}
      >
        <SelectTrigger className="h-12">
          <SelectValue placeholder="Sélectionnez un sport" />
        </SelectTrigger>
        <SelectContent>
          {sports.map((sport) => (
            <SelectItem key={sport.id} value={sport.value}>
              {sport.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
