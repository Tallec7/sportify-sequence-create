
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit2, Save, X, Trash2 } from "lucide-react"
import { SequenceType } from "@/types/settings"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from "react"

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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
      {isEditing ? (
        <div className="flex-1 flex gap-3">
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
        <div className="flex items-center gap-2">
          <span className="font-medium">{type.label}</span>
          <span className="text-sm text-muted-foreground">({type.value})</span>
        </div>
      )}
      
      <div className="flex items-center gap-2">
        {isEditing ? (
          <>
            <Button
              size="sm"
              variant="ghost"
              onClick={onSaveEdit}
              className="hover:bg-primary/10"
            >
              <Save className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={onCancelEdit}
              className="hover:bg-destructive/10"
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
              className="hover:bg-primary/10"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsDeleteDialogOpen(true)}
              className="hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </>
        )}
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action ne peut pas être annulée. Le type de séquence sera définitivement supprimé.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => {
                onDelete();
                setIsDeleteDialogOpen(false);
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
