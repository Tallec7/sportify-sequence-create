
import { useState } from "react"
import { Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AddProgressionLevelDialog } from "./AddProgressionLevelDialog"
import { ProgressionLevelItem } from "./ProgressionLevelItem"
import { useProgressionLevelsQuery } from "@/hooks/queries/useProgressionLevelsQuery"

export const ProgressionLevelsList = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { data: progressionLevels = [] } = useProgressionLevelsQuery()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <CardTitle className="text-xl font-semibold">Niveaux de progression</CardTitle>
        <Button variant="outline" size="sm" onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {progressionLevels.map((level) => (
            <ProgressionLevelItem key={level.id} level={level} />
          ))}
        </div>
        <AddProgressionLevelDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      </CardContent>
    </Card>
  )
}
