
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { PlusCircle } from "lucide-react"

export const EmptySessionsState = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
      <p className="text-muted-foreground text-lg">
        Aucune séance pour le moment.
      </p>
      <Button 
        onClick={() => navigate("/editor")}
        className="shadow-lg hover:shadow-xl transition-shadow duration-200"
      >
        <PlusCircle className="mr-2" />
        Créer ma première séance
      </Button>
    </div>
  )
}
