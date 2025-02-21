
import { useState } from "react"
import { Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AddAgeCategoryDialog } from "./AddAgeCategoryDialog"
import { AgeCategoryItem } from "./AgeCategoryItem"
import { useAgeCategoriesQuery } from "@/hooks/queries/useAgeCategoriesQuery"

export const AgeCategoriesList = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { data: ageCategories = [] } = useAgeCategoriesQuery()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <CardTitle className="text-xl font-semibold">Catégories d'âge</CardTitle>
        <Button variant="outline" size="sm" onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {ageCategories.map((category) => (
            <AgeCategoryItem key={category.id} category={category} />
          ))}
        </div>
        <AddAgeCategoryDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      </CardContent>
    </Card>
  )
}
