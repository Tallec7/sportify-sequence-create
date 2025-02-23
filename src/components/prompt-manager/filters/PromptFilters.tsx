
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Sport } from "@/types/settings"

interface PromptFiltersProps {
  search: string
  setSearch: (value: string) => void
  filterSport: string
  setFilterSport: (value: string) => void
  filterMode: string
  setFilterMode: (value: string) => void
  sports: Sport[]
}

export const PromptFilters = ({
  search,
  setSearch,
  filterSport,
  setFilterSport,
  filterMode,
  setFilterMode,
  sports
}: PromptFiltersProps) => {
  return (
    <div className="flex items-center gap-4 flex-1">
      <Input
        placeholder="Rechercher des prompts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-xs"
      />
      <Select value={filterSport} onValueChange={setFilterSport}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filtrer par sport" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les sports</SelectItem>
          {sports.map((sport) => (
            <SelectItem key={sport.id} value={sport.id}>
              {sport.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={filterMode} onValueChange={setFilterMode}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filtrer par mode" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les modes</SelectItem>
          <SelectItem value="express">Express</SelectItem>
          <SelectItem value="expert">Expert</SelectItem>
          <SelectItem value="creativity">Créativité</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

