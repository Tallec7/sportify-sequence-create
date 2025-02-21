
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { EditProgressionLevelDialog } from "./EditProgressionLevelDialog"
import { useProgressionLevelDeleteMutation } from "@/hooks/mutations/useProgressionLevelDeleteMutation"

interface ProgressionLevelItemProps {
  level: {
    id: string
    value: string
    label: string
  }
}

export const ProgressionLevelItem = ({ level }: ProgressionLevelItemProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const deleteMutation = useProgressionLevelDeleteMutation()

  const handleDelete = async () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce niveau de progression ?")) {
      await deleteMutation.mutateAsync(level.id)
    }
  }

  return (
    <div className="flex items-center justify-between group">
      <Badge variant="secondary">{level.label}</Badge>
      <div className="space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="outline" size="sm" onClick={() => setIsEditDialogOpen(true)}>
          Modifier
        </Button>
        <Button variant="destructive" size="sm" onClick={handleDelete}>
          Supprimer
        </Button>
      </div>
      <EditProgressionLevelDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        level={level}
      />
    </div>
  )
}
