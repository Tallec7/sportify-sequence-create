
import { Label } from "@/components/ui/label"
import { ActivityTypeItem } from "./ActivityTypeItem"
import { AddActivityTypeDialog } from "./AddActivityTypeDialog"
import { useActivityTypeMutation } from "@/hooks/mutations/useActivityTypeMutation"
import { useActivityTypesQuery } from "@/hooks/queries/useActivityTypesQuery"

export const ActivityTypesList = () => {
  const { data: activityTypes, refetch } = useActivityTypesQuery()
  const {
    isEditingType,
    editedTypeValue,
    editedTypeLabel,
    newTypeValue,
    newTypeLabel,
    setIsEditingType,
    setEditedTypeValue,
    setEditedTypeLabel,
    setNewTypeValue,
    setNewTypeLabel,
    handleAddType,
    handleEditType,
    handleDeleteType,
  } = useActivityTypeMutation(refetch)

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-4">
        <Label>Type d'activité</Label>
        <AddActivityTypeDialog
          newValue={newTypeValue}
          newLabel={newTypeLabel}
          onNewValueChange={setNewTypeValue}
          onNewLabelChange={setNewTypeLabel}
          onCancel={() => {
            setNewTypeValue("")
            setNewTypeLabel("")
          }}
          onAdd={handleAddType}
        />
      </div>

      <div className="space-y-2">
        {activityTypes?.map((type) => (
          <ActivityTypeItem
            key={type.id}
            type={type}
            isEditing={isEditingType === type.id}
            editedValue={editedTypeValue}
            editedLabel={editedTypeLabel}
            onEditValueChange={setEditedTypeValue}
            onEditLabelChange={setEditedTypeLabel}
            onStartEdit={() => {
              setIsEditingType(type.id)
              setEditedTypeValue(type.value)
              setEditedTypeLabel(type.label)
            }}
            onCancelEdit={() => setIsEditingType(null)}
            onSaveEdit={() => handleEditType(type.id)}
            onDelete={() => handleDeleteType(type.id)}
          />
        ))}
      </div>
    </div>
  )
}
