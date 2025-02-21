
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"

const Editor = () => {
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        navigate("/auth")
      }
    }
    checkAuth()
  }, [navigate])

  const handleSave = async () => {
    toast({
      title: "Fonctionnalité à venir",
      description: "La sauvegarde des séances sera bientôt disponible.",
    })
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Nouvelle séance</h1>
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-5 w-5" />
          Sauvegarder
        </Button>
      </div>
      <div className="rounded-lg border p-8">
        <p className="text-center text-muted-foreground">
          L'éditeur de séance sera bientôt disponible.
        </p>
      </div>
    </div>
  )
}

export default Editor
