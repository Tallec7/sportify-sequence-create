
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { EditAgeCategoryDialog } from "./EditAgeCategoryDialog"
import { useAgeCategoryDeleteMutation } from "@/hooks/mutations/useAgeCategoryDeleteMutation"

interface AgeCategoryItemProps {
  category: {
    id: string
    value: string
    label: string
  }
}

export const AgeCategoryItem = ({ category }: AgeCategoryItemProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const deleteMutation = useAgeCategoryDeleteMutation()

  const handleDelete = async () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette catégorie d'âge ?")) {
      await deleteMutation.mutateAsync(category.id)
    }
  }

  return (
    <div className="flex items-center justify-between group">
      <Badge variant="secondary">{category.label}</Badge>
      <div className="space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="outline" size="sm" onClick={() => setIsEditDialogOpen(true)}>
          Modifier
        </Button>
        <Button variant="destructive" size="sm" onClick={handleDelete}>
          Supprimer
        </Button>
      </div>
      <EditAgeCategoryDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        category={category}
      />
    </div>
  )
}
