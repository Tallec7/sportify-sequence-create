
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const ACTIVITY_TYPES = ["exercise", "situation"]

export const ActivityTypesList = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Types d'activité</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {ACTIVITY_TYPES.map((type) => (
            <Badge key={type} variant="secondary">
              {type === "exercise" ? "Exercice" : "Situation"}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
