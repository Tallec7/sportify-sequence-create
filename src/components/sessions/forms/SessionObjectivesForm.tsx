
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { SessionObjective } from "@/hooks/queries/useObjectivesQuery"
import { useObjectiveMutation } from "@/hooks/mutations/useObjectiveMutation"
import { useObjectiveOrderMutation } from "@/hooks/mutations/useObjectiveOrderMutation"
import { Badge } from "@/components/ui/badge"

interface SessionObjectivesFormProps {
  objectives: SessionObjective[]
  sessionId: string | undefined
}

export const SessionObjectivesForm = ({
  objectives,
  sessionId,
}: SessionObjectivesFormProps) => {
  const objectiveMutation = useObjectiveMutation(sessionId)
  const objectiveOrderMutation = useObjectiveOrderMutation(sessionId)

  const [newObjective, setNewObjective] = useState<Omit<SessionObjective, "id">>({
    description: "",
    type: "technique",
    is_priority: false,
    order_index: objectives.length,
    objective_type: "apprentissage",
    session_id: sessionId || ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (sessionId) {
      objectiveMutation.mutate(newObjective)
      setNewObjective({
        description: "",
        type: "technique",
        is_priority: false,
        order_index: objectives.length + 1,
        objective_type: "apprentissage",
        session_id: sessionId
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {objectives.map((objective, index) => (
          <div
            key={objective.id}
            className="flex items-center gap-4 rounded-lg border p-4"
          >
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{objective.description}</span>
                {objective.is_priority && (
                  <Badge variant="secondary">Prioritaire</Badge>
                )}
              </div>
              <div className="flex gap-2 text-sm text-muted-foreground">
                <Badge variant="outline">{objective.type}</Badge>
                <Badge variant="outline">{objective.objective_type}</Badge>
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={newObjective.description}
              onChange={(e) =>
                setNewObjective({ ...newObjective, description: e.target.value })
              }
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="type">Type d'objectif</Label>
              <Select
                value={newObjective.type}
                onValueChange={(value) =>
                  setNewObjective({ ...newObjective, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technique">Technique</SelectItem>
                  <SelectItem value="tactique">Tactique</SelectItem>
                  <SelectItem value="physique">Physique</SelectItem>
                  <SelectItem value="mental">Mental</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="objective_type">Catégorie</Label>
              <Select
                value={newObjective.objective_type}
                onValueChange={(value) =>
                  setNewObjective({ ...newObjective, objective_type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apprentissage">Apprentissage</SelectItem>
                  <SelectItem value="developpement">Développement</SelectItem>
                  <SelectItem value="perfectionnement">Perfectionnement</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_priority"
              checked={newObjective.is_priority}
              onCheckedChange={(checked) =>
                setNewObjective({
                  ...newObjective,
                  is_priority: checked as boolean,
                })
              }
            />
            <Label htmlFor="is_priority">Objectif prioritaire</Label>
          </div>
        </div>

        <Button type="submit" className="gap-2">
          <Plus className="h-4 w-4" />
          Ajouter l'objectif
        </Button>
      </form>
    </div>
  )
}
