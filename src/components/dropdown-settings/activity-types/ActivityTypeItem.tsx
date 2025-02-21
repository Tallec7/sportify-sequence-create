
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { EditActivityTypeDialog } from "./EditActivityTypeDialog"
import { useActivityTypeDeleteMutation } from "@/hooks/mutations/useActivityTypeDeleteMutation"

interface ActivityTypeItemProps {
  type: {
    id: string
    value: string
    label: string
  }
}

export const ActivityTypeItem = ({ type }: ActivityTypeItemProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const deleteMutation = useActivityTypeDeleteMutation()

  const handleDelete = async () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce type d'activité ?")) {
      await deleteMutation.mutateAsync(type.id)
    }
  }

  return (
    <div className="flex items-center justify-between group">
      <Badge variant="secondary">{type.label}</Badge>
      <div className="space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="outline" size="sm" onClick={() => setIsEditDialogOpen(true)}>
          Modifier
        </Button>
        <Button variant="destructive" size="sm" onClick={handleDelete}>
          Supprimer
        </Button>
      </div>
      <EditActivityTypeDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        type={type}
      />
    </div>
  )
}
