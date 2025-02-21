
import { useState } from "react"
import { Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AddProgressionLevelDialog } from "./AddProgressionLevelDialog"
import { ProgressionLevelItem } from "./ProgressionLevelItem"
import { useProgressionLevelsQuery } from "@/hooks/queries/useProgressionLevelsQuery"
import { useProgressionLevelUpdateMutation } from "@/hooks/mutations/useProgressionLevelUpdateMutation"
import { useProgressionLevelDeleteMutation } from "@/hooks/mutations/useProgressionLevelDeleteMutation"

export const ProgressionLevelsList = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditingLevel, setIsEditingLevel] = useState<string | null>(null)
  const [editedValue, setEditedValue] = useState("")
  const [editedLabel, setEditedLabel] = useState("")
  
  const { data: progressionLevels = [] } = useProgressionLevelsQuery()
  const updateMutation = useProgressionLevelUpdateMutation()
  const deleteMutation = useProgressionLevelDeleteMutation()

  const handleStartEdit = (level: { id: string; value: string; label: string }) => {
    setIsEditingLevel(level.id)
    setEditedValue(level.value)
    setEditedLabel(level.label)
  }

  const handleCancelEdit = () => {
    setIsEditingLevel(null)
    setEditedValue("")
    setEditedLabel("")
  }

  const handleSaveEdit = async (id: string) => {
    await updateMutation.mutateAsync({ id, value: editedValue, label: editedLabel })
    setIsEditingLevel(null)
  }

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
            <ProgressionLevelItem
              key={level.id}
              level={level}
              isEditing={isEditingLevel === level.id}
              editedValue={editedValue}
              editedLabel={editedLabel}
              onEditValueChange={setEditedValue}
              onEditLabelChange={setEditedLabel}
              onStartEdit={() => handleStartEdit(level)}
              onCancelEdit={handleCancelEdit}
              onSaveEdit={() => handleSaveEdit(level.id)}
              onDelete={() => deleteMutation.mutate(level.id)}
            />
          ))}
        </div>
        <AddProgressionLevelDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      </CardContent>
    </Card>
  )
}
