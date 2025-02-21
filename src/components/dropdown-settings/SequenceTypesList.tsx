
import { Label } from "@/components/ui/label"
import { SequenceType } from "@/types/settings"
import { SequenceTypeItem } from "./sequence-types/SequenceTypeItem"
import { AddSequenceTypeDialog } from "./sequence-types/AddSequenceTypeDialog"
import { useSequenceTypesMutation } from "@/hooks/mutations/useSequenceTypesMutation"

interface SequenceTypesListProps {
  sequenceTypes: SequenceType[]
  onSequenceTypesChange: () => void
}

export const SequenceTypesList = ({ sequenceTypes, onSequenceTypesChange }: SequenceTypesListProps) => {
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
  } = useSequenceTypesMutation(onSequenceTypesChange)

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-4">
        <Label>Type de séquence</Label>
        <AddSequenceTypeDialog
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
        {sequenceTypes.map((type) => (
          <SequenceTypeItem
            key={type.id}
            type={type}
            isEditing={isEditingType === type.id}
            editedValue={editedTypeValue}
            editedLabel={editedTypeLabel}
            onEditValueChange={setEditedTypeValue}
            onEditLabelChange={setEditedTypeLabel}
            onStartEdit={() => {
              setIsEditingType(type.id!)
              setEditedTypeValue(type.value)
              setEditedTypeLabel(type.label)
            }}
            onCancelEdit={() => setIsEditingType(null)}
            onSaveEdit={() => handleEditType(type.id!)}
            onDelete={() => handleDeleteType(type.id!)}
          />
        ))}
      </div>
    </div>
  )
}
