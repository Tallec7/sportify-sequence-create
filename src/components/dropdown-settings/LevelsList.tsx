
import { Label } from "@/components/ui/label"
import { Level } from "@/types/settings"
import { LevelItem } from "./levels/LevelItem"
import { AddLevelDialog } from "./levels/AddLevelDialog"
import { useLevelsMutation } from "@/hooks/mutations/useLevelsMutation"

interface LevelsListProps {
  levels: Level[]
  onLevelsChange: () => void
}

export const LevelsList = ({ levels, onLevelsChange }: LevelsListProps) => {
  const {
    isEditingLevel,
    editedLevelValue,
    editedLevelLabel,
    newLevelValue,
    newLevelLabel,
    setIsEditingLevel,
    setEditedLevelValue,
    setEditedLevelLabel,
    setNewLevelValue,
    setNewLevelLabel,
    handleAddLevel,
    handleEditLevel,
    handleDeleteLevel,
  } = useLevelsMutation(onLevelsChange)

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-4">
        <Label>Niveau de difficulté</Label>
        <AddLevelDialog
          newValue={newLevelValue}
          newLabel={newLevelLabel}
          onNewValueChange={setNewLevelValue}
          onNewLabelChange={setNewLevelLabel}
          onCancel={() => {
            setNewLevelValue("")
            setNewLevelLabel("")
          }}
          onAdd={handleAddLevel}
        />
      </div>

      <div className="space-y-2">
        {levels.map((level) => (
          <LevelItem
            key={level.id}
            level={level}
            isEditing={isEditingLevel === level.id}
            editedValue={editedLevelValue}
            editedLabel={editedLevelLabel}
            onEditValueChange={setEditedLevelValue}
            onEditLabelChange={setEditedLevelLabel}
            onStartEdit={() => {
              setIsEditingLevel(level.id!)
              setEditedLevelValue(level.value)
              setEditedLevelLabel(level.label)
            }}
            onCancelEdit={() => setIsEditingLevel(null)}
            onSaveEdit={() => handleEditLevel(level.id!)}
            onDelete={() => handleDeleteLevel(level.id!)}
          />
        ))}
      </div>
    </div>
  )
}
