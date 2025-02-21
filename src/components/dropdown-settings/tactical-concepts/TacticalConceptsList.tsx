
import { TacticalConceptOption } from "@/types/tactical-concepts"
import { TacticalConceptItem } from "./TacticalConceptItem"

interface TacticalConceptsListComponentProps {
  tacticalConcepts: TacticalConceptOption[]
  onConceptsChange: () => void
}

export const TacticalConceptsListComponent = ({ 
  tacticalConcepts, 
  onConceptsChange 
}: TacticalConceptsListComponentProps) => {
  return (
    <div className="space-y-2 mt-4">
      {tacticalConcepts.map((concept) => (
        <TacticalConceptItem
          key={concept.id}
          concept={concept}
          onConceptsChange={onConceptsChange}
        />
      ))}
    </div>
  )
}

