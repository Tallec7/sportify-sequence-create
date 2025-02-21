
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit2, Save, X, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ActivityTypeItemProps {
  type: {
    id: string
    value: string
    label: string
  }
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

export const ActivityTypeItem = ({
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
}: ActivityTypeItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-card hover:bg-accent/5 transition-colors group">
      {isEditing ? (
        <div className="flex-1 space-y-2">
          <Input
            placeholder="Code unique"
            value={editedValue}
            onChange={(e) => onEditValueChange(e.target.value)}
            className="max-w-[200px]"
          />
          <Input
            placeholder="Nom affiché"
            value={editedLabel}
            onChange={(e) => onEditLabelChange(e.target.value)}
            className="max-w-[200px]"
          />
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="font-medium">
            {type.label}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {type.value}
          </span>
        </div>
      )}
      
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {isEditing ? (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={onSaveEdit}
              className="h-8 px-2"
            >
              <Save className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancelEdit}
              className="h-8 px-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={onStartEdit}
              className="h-8 px-2"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="h-8 px-2 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
