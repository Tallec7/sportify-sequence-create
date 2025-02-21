
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, X, Pencil, Trash2 } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

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
    <div className="flex items-center justify-between p-2 rounded border bg-background">
      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <Input
            value={editedValue}
            onChange={(e) => onEditValueChange(e.target.value)}
            placeholder="Code unique"
            className="max-w-[200px]"
          />
          <Input
            value={editedLabel}
            onChange={(e) => onEditLabelChange(e.target.value)}
            placeholder="Nom affiché"
          />
        </div>
      ) : (
        <span className="font-medium">{type.label}</span>
      )}
      <div className="flex gap-2">
        {isEditing ? (
          <>
            <Button
              size="sm"
              variant="ghost"
              onClick={onSaveEdit}
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={onCancelEdit}
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <>
            <Button
              size="sm"
              variant="ghost"
              onClick={onStartEdit}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="ghost">
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action est irréversible. Cela supprimera définitivement ce type d'activité.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={onDelete}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Supprimer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
      </div>
    </div>
  )
}
