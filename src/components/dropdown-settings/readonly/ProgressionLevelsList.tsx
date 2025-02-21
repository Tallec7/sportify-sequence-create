
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const PROGRESSION_LEVELS = [1, 2, 3, 4, 5]

export const ProgressionLevelsList = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Niveaux de progression</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {PROGRESSION_LEVELS.map((level) => (
            <Badge key={level} variant="secondary">
              Niveau {level}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Ces niveaux peuvent être utilisés comme niveau actuel ou niveau cible dans les progressions techniques.
        </p>
      </CardContent>
    </Card>
  )
}
