
import { Session } from "@/hooks/queries/useSessionsQuery"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom"
import { Eye, Pencil, Trash2 } from "lucide-react"
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
import { Button } from "@/components/ui/button"

interface SessionCardProps {
  session: Session
  onDelete: (sessionId: string) => void
}

export const SessionCard = ({ session, onDelete }: SessionCardProps) => {
  const navigate = useNavigate()
  const { toast } = useToast()

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}min`
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return remainingMinutes > 0 ? `${hours}h${remainingMinutes}` : `${hours}h`
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
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
                onClick={() => onDelete(session.id)}
                className="bg-destructive hover:bg-destructive/90"
              >
                Supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  )
}
