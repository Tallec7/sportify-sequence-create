
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { PlusCircle, Eye, Pencil, Trash2 } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"

type Session = {
  id: string
  title: string
  description: string | null
  sport: string
  level: string
  duration: number
  participants_min: number
  participants_max: number
  created_at: string
}

const Dashboard = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        navigate("/auth")
      } else {
        fetchSessions(session.user.id)
      }
    }
    checkAuth()
  }, [navigate])

  const fetchSessions = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error

      setSessions(data)
    } catch (error) {
      console.error("Error fetching sessions:", error)
    } finally {
      setLoading(false)
    }
  }

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

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}min`
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return remainingMinutes > 0 ? `${hours}h${remainingMinutes}` : `${hours}h`
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
            <Card 
              key={session.id}
              className="group hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
            >
              <CardHeader>
                <div className="space-y-1">
                  <CardTitle className="line-clamp-1">{session.title}</CardTitle>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default" className="bg-primary/10 text-primary hover:bg-primary/20">
                      {session.sport}
                    </Badge>
                    <Badge variant="outline" className="border-primary/20">
                      {session.level}
                    </Badge>
                    <Badge variant="secondary">
                      {formatDuration(session.duration)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
                  {session.description || "Aucune description"}
                </p>
                <p className="mt-4 text-xs text-muted-foreground">
                  {session.participants_min === session.participants_max ? (
                    `${session.participants_min} participants`
                  ) : (
                    `${session.participants_min}-${session.participants_max} participants`
                  )}
                </p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(`/session/${session.id}`)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Eye className="w-4 h-4" />
                  <span className="sr-only">Voir</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(`/editor/${session.id}`)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Pencil className="w-4 h-4" />
                  <span className="sr-only">Modifier</span>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="sr-only">Supprimer</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Cette action est irréversible. La séance sera définitivement supprimée.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(session.id)}
                        className="bg-destructive hover:bg-destructive/90"
                      >
                        Supprimer
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
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
      )}
    </div>
  )
}

export default Dashboard
