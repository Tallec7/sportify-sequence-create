
import { useState } from "react"
import { Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AddActivityTypeDialog } from "./AddActivityTypeDialog"
import { ActivityTypeItem } from "./ActivityTypeItem"
import { useActivityTypesQuery } from "@/hooks/queries/useActivityTypesQuery"

export const ActivityTypesList = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { data: activityTypes = [] } = useActivityTypesQuery()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <CardTitle className="text-xl font-semibold">Types d'activité</CardTitle>
        <Button variant="outline" size="sm" onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activityTypes.map((type) => (
            <ActivityTypeItem key={type.id} type={type} />
          ))}
        </div>
        <AddActivityTypeDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      </CardContent>
    </Card>
  )
}
