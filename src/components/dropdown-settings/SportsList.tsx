
import { Label } from "@/components/ui/label"
import { Sport } from "@/types/tactical-concepts"
import { AddSportDialog } from "./sports/AddSportDialog"
import { SportItem } from "./sports/SportItem"

interface SportsListProps {
  sports: Sport[]
  onSportsChange: () => void
}

export const SportsList = ({ sports, onSportsChange }: SportsListProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Label className="text-lg font-semibold">Sports</Label>
          <p className="text-sm text-muted-foreground mt-1">
            Gérez la liste des sports disponibles
          </p>
        </div>
        <AddSportDialog onSportsChange={onSportsChange} />
      </div>

      <div className="grid gap-3">
        {sports.map((sport) => (
          <SportItem
            key={sport.id}
            sport={sport}
            onSportsChange={onSportsChange}
          />
        ))}
      </div>
    </div>
  )
}
