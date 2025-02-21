
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
    <div className="flex items-center justify-between p-4 rounded-lg bg-card hover:bg-accent/5 transition-colors group">
      {isEditing ? (
        <div className="flex-1 space-y-2">
          <Input
            placeholder="Code unique"
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            className="max-w-[200px]"
          />
          <Input
            placeholder="Nom affiché"
            value={editedLabel}
            onChange={(e) => setEditedLabel(e.target.value)}
            className="max-w-[200px]"
          />
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="font-medium">
            {category.label}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {category.value}
          </span>
        </div>
      )}
      
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {isEditing ? (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSaveEdit}
              className="h-8 px-2"
            >
              <Save className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancelEdit}
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
              onClick={handleStartEdit}
              className="h-8 px-2"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDeleteDialogOpen(true)}
              className="h-8 px-2 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
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
            <AlertDialogAction onClick={handleDelete}>
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

