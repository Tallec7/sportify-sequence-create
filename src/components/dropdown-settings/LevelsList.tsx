
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
    editedLevelLabelFr,
    editedLevelLabelEn,
    newLevelValue,
    newLevelLabel,
    setIsEditingLevel,
    setEditedLevelValue,
    setEditedLevelLabel,
    setEditedLevelLabelFr,
    setEditedLevelLabelEn,
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
          onAdd={() => handleAddLevel({
            value: newLevelValue,
            label: newLevelLabel,
            label_fr: newLevelLabel, // Using same value as label for now
            label_en: newLevelLabel, // Using same value as label for now
          })}
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
              setEditedLevelLabelFr(level.label_fr || level.label)
              setEditedLevelLabelEn(level.label_en || level.label)
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

