
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}min`
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return remainingMinutes > 0 ? `${hours}h${remainingMinutes}` : `${hours}h`
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Mes séances</h1>
        <Button onClick={() => navigate("/editor")} className="gap-2">
          <PlusCircle className="h-5 w-5" />
          Nouvelle séance
        </Button>
      </div>
      {loading ? (
        <div className="text-center p-8">
          <p className="text-muted-foreground">Chargement des séances...</p>
        </div>
      ) : sessions.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sessions.map((session) => (
            <Card key={session.id} className="cursor-pointer hover:bg-accent/50 transition-colors">
              <CardHeader>
                <CardTitle>{session.title}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Badge>{session.sport}</Badge>
                  <Badge variant="outline">{session.level}</Badge>
                  <Badge variant="secondary">{formatDuration(session.duration)}</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {session.description || "Aucune description"}
                </p>
                <div className="mt-4 text-xs text-muted-foreground">
                  {session.participants_min === session.participants_max ? (
                    `${session.participants_min} participants`
                  ) : (
                    `${session.participants_min}-${session.participants_max} participants`
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          Aucune séance pour le moment. Créez votre première séance !
        </div>
      )}
    </div>
  )
}

export default Dashboard
