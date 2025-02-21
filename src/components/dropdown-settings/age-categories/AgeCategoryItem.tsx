
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit2, Save, X, Trash2 } from "lucide-react"
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
import { useAgeCategoryUpdateMutation } from "@/hooks/mutations/useAgeCategoryUpdateMutation"
import { useAgeCategoryDeleteMutation } from "@/hooks/mutations/useAgeCategoryDeleteMutation"

interface AgeCategoryItemProps {
  category: {
    id: string
    value: string
    label: string
  }
}

export const AgeCategoryItem = ({ category }: AgeCategoryItemProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedValue, setEditedValue] = useState(category.value)
  const [editedLabel, setEditedLabel] = useState(category.label)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const updateMutation = useAgeCategoryUpdateMutation()
  const deleteMutation = useAgeCategoryDeleteMutation()

  const handleStartEdit = () => {
    setIsEditing(true)
    setEditedValue(category.value)
    setEditedLabel(category.label)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditedValue(category.value)
    setEditedLabel(category.label)
  }

  const handleSaveEdit = () => {
    updateMutation.mutate({
      id: category.id,
      value: editedValue,
      label: editedLabel,
    })
    setIsEditing(false)
  }

  const handleDelete = () => {
    deleteMutation.mutate(category.id)
    setIsDeleteDialogOpen(false)
  }

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
      {isEditing ? (
        <div className="flex-1 flex gap-3">
          <Input
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            placeholder="Code unique"
            className="max-w-[200px]"
          />
          <Input
            value={editedLabel}
            onChange={(e) => setEditedLabel(e.target.value)}
            placeholder="Nom affiché"
          />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="font-medium">{category.label}</span>
          <span className="text-sm text-muted-foreground">({category.value})</span>
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
              Cette action ne peut pas être annulée. La catégorie d'âge sera définitivement supprimée.
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
