
import { Label } from "@/components/ui/label"
import { useAgeCategoriesQuery } from "@/hooks/queries/useAgeCategoriesQuery"
import { AgeCategoryItem } from "./AgeCategoryItem"
import { AddAgeCategoryDialog } from "./AddAgeCategoryDialog"
import { useState } from "react"

export const AgeCategoriesList = () => {
  const { data: categories = [] } = useAgeCategoriesQuery()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Label className="text-lg font-semibold">Catégories d'âge</Label>
          <p className="text-sm text-muted-foreground mt-1">
            Gérez les catégories d'âge disponibles
          </p>
        </div>
        <AddAgeCategoryDialog 
          open={isAddDialogOpen} 
          onOpenChange={setIsAddDialogOpen}
        />
      </div>

      <div className="grid gap-3">
        {categories.map((category) => (
          <AgeCategoryItem key={category.id} category={category} />
        ))}
      </div>
    </div>
  )
