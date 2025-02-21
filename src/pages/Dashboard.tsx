
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { SessionCard } from "@/components/sessions/SessionCard"
import { EmptySessionsState } from "@/components/sessions/EmptySessionsState"
import { useSessionsQuery } from "@/hooks/queries/useSessionsQuery"

const Dashboard = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { sessions, loading, setSessions } = useSessionsQuery(undefined)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        navigate("/auth")
      }
    }
    checkAuth()
  }, [navigate])

  const handleDelete = async (sessionId: string) => {
    try {
      const { error } = await supabase
        .from('sessions')
        .delete()
        .eq('id', sessionId)

      if (error) throw error

      setSessions(sessions.filter(session => session.id !== sessionId))
      toast({
        title: "Succès",
        description: "La séance a été supprimée avec succès.",
      })
    } catch (error) {
      console.error("Error deleting session:", error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression de la séance.",
      })
    }
  }

  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Mes séances</h1>
        <Button 
          onClick={() => navigate("/editor")} 
          className="shadow-lg hover:shadow-xl transition-shadow duration-200"
        >
          <PlusCircle className="mr-2" />
          Nouvelle séance
        </Button>
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground animate-pulse">
            Chargement des séances...
          </div>
        </div>
      ) : sessions.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sessions.map((session) => (
            <SessionCard 
              key={session.id} 
              session={session}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <EmptySessionsState />
      )}
    </div>
  )
}

export default Dashboard
