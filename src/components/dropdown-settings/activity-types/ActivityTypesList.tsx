
import { Label } from "@/components/ui/label"
import { useActivityTypesQuery } from "@/hooks/queries/useActivityTypesQuery"
import { ActivityTypeItem } from "./ActivityTypeItem"
import { AddActivityTypeDialog } from "./AddActivityTypeDialog"
import { useState } from "react"

export const ActivityTypesList = () => {
  const { data: activityTypes = [] } = useActivityTypesQuery()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Label className="text-lg font-semibold">Types d'activité</Label>
          <p className="text-sm text-muted-foreground mt-1">
            Gérez les types d'activités disponibles
          </p>
        </div>
        <AddActivityTypeDialog 
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
        />
      </div>

      <div className="grid gap-3">
        {activityTypes.map((type) => (
          <ActivityTypeItem key={type.id} type={type} />
        ))}
      </div>
    </div>
  )
}
