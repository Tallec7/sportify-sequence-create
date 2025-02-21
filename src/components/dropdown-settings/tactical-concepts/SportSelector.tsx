
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sport } from "@/types/tactical-concepts"

interface SportSelectorProps {
  sports: Sport[]
  selectedSport: string
  onSportChange: (value: string) => void
}

export const SportSelector = ({ sports, selectedSport, onSportChange }: SportSelectorProps) => {
  return (
    <Select
      value={selectedSport}
      onValueChange={onSportChange}
    >
      <SelectTrigger>
        <SelectValue placeholder="Sélectionnez un sport" />
      </SelectTrigger>
      <SelectContent>
        {sports.map((sport) => (
          <SelectItem key={sport.value} value={sport.value}>
            {sport.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

