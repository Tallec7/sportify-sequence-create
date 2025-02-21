
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit2, Save, X, Trash2 } from "lucide-react"
import { useActivityTypeUpdateMutation } from "@/hooks/mutations/useActivityTypeUpdateMutation"
import { useActivityTypeDeleteMutation } from "@/hooks/mutations/useActivityTypeDeleteMutation"

interface ActivityTypeItemProps {
  type: {
    id: string
    value: string
    label: string
  }
}

export const ActivityTypeItem = ({ type }: ActivityTypeItemProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedValue, setEditedValue] = useState(type.value)
  const [editedLabel, setEditedLabel] = useState(type.label)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const updateMutation = useActivityTypeUpdateMutation()
  const deleteMutation = useActivityTypeDeleteMutation()

  const handleStartEdit = () => {
    setIsEditing(true)
    setEditedValue(type.value)
    setEditedLabel(type.label)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditedValue(type.value)
    setEditedLabel(type.label)
  }

  const handleSaveEdit = () => {
    updateMutation.mutate({
      id: type.id,
      value: editedValue,
      label: editedLabel,
    })
    setIsEditing(false)
  }

  const handleDelete = () => {
    deleteMutation.mutate(type.id)
    setIsDeleteDialogOpen(false)
  }

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
      {isEditing ? (
        <div className="flex-1">
          <Input
            type="hidden"
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
          />
          <Input
            value={editedLabel}
            onChange={(e) => setEditedLabel(e.target.value)}
            placeholder="Nom affiché"
          />
        </div>
      ) : (
        <div className="flex items-center">
          <span className="font-medium">{type.label}</span>
        </div>
      )}
      
      <div className="flex items-center gap-2">
        {isEditing ? (
          <>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleSaveEdit}
              className="hover:bg-primary/10"
            >
              <Save className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCancelEdit}
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
              onClick={handleStartEdit}
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
              Cette action ne peut pas être annulée. Le type d'activité sera définitivement supprimé.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
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

