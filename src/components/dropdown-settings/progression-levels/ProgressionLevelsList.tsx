
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { useProgressionLevelsQuery } from "@/hooks/queries/useProgressionLevelsQuery"
import { AddProgressionLevelDialog } from "./AddProgressionLevelDialog"
import { ProgressionLevelItem } from "./ProgressionLevelItem"
import { useProgressionLevelUpdateMutation } from "@/hooks/mutations/useProgressionLevelUpdateMutation"
import { useProgressionLevelDeleteMutation } from "@/hooks/mutations/useProgressionLevelDeleteMutation"

export const ProgressionLevelsList = () => {
  const { data: progressionLevels = [] } = useProgressionLevelsQuery()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editedValue, setEditedValue] = useState("")
  const [editedLabel, setEditedLabel] = useState("")

  const updateMutation = useProgressionLevelUpdateMutation()
  const deleteMutation = useProgressionLevelDeleteMutation()

  const handleStartEdit = (level: { id: string; value: string; label: string }) => {
    setEditingId(level.id)
    setEditedValue(level.value)
    setEditedLabel(level.label)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditedValue("")
    setEditedLabel("")
  }

  const handleSaveEdit = (id: string) => {
    updateMutation.mutate({
      id,
      value: editedValue,
      label: editedLabel,
    })
    setEditingId(null)
  }

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Label className="text-lg font-semibold">Niveaux de progression</Label>
          <p className="text-sm text-muted-foreground mt-1">
            Gérez les niveaux de progression disponibles
          </p>
        </div>
        <AddProgressionLevelDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
        />
      </div>

      <div className="grid gap-3">
        {progressionLevels.map((level) => (
          <ProgressionLevelItem
            key={level.id}
            level={level}
            isEditing={editingId === level.id}
            editedValue={editedValue}
            editedLabel={editedLabel}
            onEditValueChange={setEditedValue}
            onEditLabelChange={setEditedLabel}
            onStartEdit={() => handleStartEdit(level)}
            onCancelEdit={handleCancelEdit}
            onSaveEdit={() => handleSaveEdit(level.id)}
            onDelete={() => handleDelete(level.id)}
          />
        ))}
      </div>
    </div>
  )
}

