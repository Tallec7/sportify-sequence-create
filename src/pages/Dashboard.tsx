
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"

const Dashboard = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        navigate("/auth")
      }
    }
    checkAuth()
  }, [navigate])

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Mes séances</h1>
        <Button onClick={() => navigate("/editor")} className="gap-2">
          <PlusCircle className="h-5 w-5" />
          Nouvelle séance
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Les séances seront affichées ici */}
        <div className="p-8 text-center text-muted-foreground">
          Aucune séance pour le moment. Créez votre première séance !
        </div>
      </div>
    </div>
  )
}

export default Dashboard
