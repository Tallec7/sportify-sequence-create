
import { Target } from "lucide-react"
import { SequenceObjective } from "@/types/sequence"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ExerciseObjectivesListProps {
  objectives: SequenceObjective[]
}

export const ExerciseObjectivesList = ({ objectives }: ExerciseObjectivesListProps) => {
  const getObjectiveTypeLabel = (type: string) => {
    switch (type) {
      case "apprentissage":
        return "Apprentissage"
      case "developpement":
        return "Développement"
      case "perfectionnement":
        return "Perfectionnement"
      default:
        return type
    }
  }

  const renderObjectivesByType = () => {
    const objectivesByType = objectives.reduce((acc, obj) => {
      if (!acc[obj.objective_type]) {
        acc[obj.objective_type] = []
      }
      acc[obj.objective_type].push(obj)
      return acc
    }, {} as Record<string, typeof objectives>)

    return Object.entries(objectivesByType).map(([type, objs]) => (
      <div key={type} className="space-y-2">
        <h5 className="text-sm font-medium text-muted-foreground">
          {getObjectiveTypeLabel(type)}
        </h5>
        {objs.map((obj) => (
          <div key={obj.id} className="flex items-center gap-2 bg-accent/50 rounded-lg p-2">
            {obj.is_priority && (
              <Target className="h-4 w-4 text-primary shrink-0" />
            )}
            <span className="text-sm">{obj.description}</span>
          </div>
        ))}
      </div>
    ))
  }

  return objectives.length > 0 ? (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Objectifs de la séquence</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] pr-4">
          <div className="space-y-4">
            {renderObjectivesByType()}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  ) : null
}
