
import { Label } from "@/components/ui/label"
import { IntensityLevel } from "@/types/settings"
import { IntensityLevelItem } from "./intensity-levels/IntensityLevelItem"
import { AddIntensityLevelDialog } from "./intensity-levels/AddIntensityLevelDialog"
import { useIntensityLevelsMutation } from "@/hooks/mutations/useIntensityLevelsMutation"

interface IntensityLevelsListProps {
  intensityLevels: IntensityLevel[]
  onIntensityLevelsChange: () => void
}

export const IntensityLevelsList = ({ intensityLevels, onIntensityLevelsChange }: IntensityLevelsListProps) => {
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
  } = useIntensityLevelsMutation(onIntensityLevelsChange)

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-4">
        <Label>Niveau d'intensité</Label>
        <AddIntensityLevelDialog
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
        {intensityLevels.map((level) => (
          <IntensityLevelItem
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
