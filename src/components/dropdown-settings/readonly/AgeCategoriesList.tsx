
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const AGE_CATEGORIES = ["U9", "U11", "U13", "U15", "U17", "U19", "Senior"]

export const AgeCategoriesList = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Catégories d'âge</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {AGE_CATEGORIES.map((category) => (
            <Badge key={category} variant="secondary">
              {category}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
