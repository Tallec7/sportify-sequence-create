
export interface TacticalConceptOption {
  id?: string
  value: string
  label: string
  sport_id?: string
}

export interface Sport {
  id?: string
  value: string
  label: string
}

export interface TacticalConceptsListProps {
  sports: Sport[]
  selectedSport: string
  tacticalConcepts: TacticalConceptOption[]
  onSportChange: (value: string) => void
  onConceptsChange: () => void
}
