
import { useState } from "react"
import { Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { AddAgeCategoryDialog } from "./AddAgeCategoryDialog"
import { AgeCategoryItem } from "./AgeCategoryItem"
import { useAgeCategoriesQuery } from "@/hooks/queries/useAgeCategoriesQuery"

export const AgeCategoriesList = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { data: ageCategories = [], isLoading } = useAgeCategoriesQuery()

  const filteredCategories = ageCategories.filter(category => 
    category.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
    category.value.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
          <Input
            placeholder="Rechercher une catégorie d'âge..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4"
          />

          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCategories.map((category) => (
                <AgeCategoryItem key={category.id} category={category} />
              ))}
              {filteredCategories.length === 0 && searchQuery && (
                <p className="text-center text-muted-foreground py-4">
                  Aucune catégorie d'âge ne correspond à votre recherche
                </p>
              )}
            </div>
          )}
        </div>
        <AddAgeCategoryDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      </CardContent>
    </Card>
  )
}
