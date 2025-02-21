
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil, Trash2, X, Save } from "lucide-react"
import { SequenceType } from "@/types/settings"

interface SequenceTypeItemProps {
  type: SequenceType
  isEditing: boolean
  editedValue: string
  editedLabel: string
  onEditValueChange: (value: string) => void
  onEditLabelChange: (value: string) => void
  onStartEdit: () => void
  onCancelEdit: () => void
  onSaveEdit: () => void
  onDelete: () => void
}

export const SequenceTypeItem = ({
  type,
  isEditing,
  editedValue,
  editedLabel,
  onEditValueChange,
  onEditLabelChange,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onDelete,
}: SequenceTypeItemProps) => {
  return (
    <div className="flex items-center space-x-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
      {isEditing ? (
        <>
          <div className="flex-1 space-y-2">
            <Input
              placeholder="Valeur"
              value={editedValue}
              onChange={(e) => onEditValueChange(e.target.value)}
            />
            <Input
              placeholder="Label"
              value={editedLabel}
              onChange={(e) => onEditLabelChange(e.target.value)}
            />
          </div>
          <div className="space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={onSaveEdit}
            >
              <Save className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onCancelEdit}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="flex-1">
            <p className="text-sm font-medium">{type.label}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{type.value}</p>
          </div>
          <div className="space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={onStartEdit}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
