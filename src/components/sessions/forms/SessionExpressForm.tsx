
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useSportsQuery } from "@/hooks/queries/useSportsQuery"
import { useLevelsQuery } from "@/hooks/queries/useLevelsQuery"
import { SessionPreview } from "../SessionPreview"
import { toast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"

interface SessionExpressFormProps {
  onGenerate: (answers: any) => void
  isLoading: boolean
}

export const SessionExpressForm = ({ onGenerate, isLoading }: SessionExpressFormProps) => {
  const { data: sports = [] } = useSportsQuery()
  const { data: levels = [] } = useLevelsQuery()
  const [generatedSession, setGeneratedSession] = useState<any>(null)
  const [answers, setAnswers] = useState({
    sport: "",
    level: "",
    participants: "10",
    duration: "60"
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-session', {
        body: { mode: 'express', answers }
      })

      if (error) throw error

      if (data.session) {
        console.log("Session générée:", data.session)
        setGeneratedSession(data.session)
      }
    } catch (error) {
      console.error("Erreur lors de la génération:", error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la génération de la séance."
      })
    }
  }

  const handleEdit = (editedSession: any) => {
    setGeneratedSession(editedSession)
  }

  const handleSave = async () => {
    try {
      onGenerate(generatedSession)
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement de la séance."
      })
    }
  }

  if (generatedSession) {
    return (
      <SessionPreview
        generatedSession={generatedSession}
        onEdit={handleEdit}
        onSave={handleSave}
        onCancel={() => setGeneratedSession(null)}
      />
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Sport</Label>
        <Select 
          value={answers.sport}
          onValueChange={(value) => setAnswers({...answers, sport: value})}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choisir un sport" />
          </SelectTrigger>
          <SelectContent>
            {sports.map((sport) => (
              <SelectItem key={sport.id} value={sport.value}>
                {sport.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Niveau</Label>
        <Select
          value={answers.level}
          onValueChange={(value) => setAnswers({...answers, level: value})}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choisir un niveau" />
          </SelectTrigger>
          <SelectContent>
            {levels.map((level) => (
              <SelectItem key={level.id} value={level.value}>
                {level.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Nombre de participants</Label>
        <Input
          type="number"
          value={answers.participants}
          onChange={(e) => setAnswers({...answers, participants: e.target.value})}
          min="1"
          max="30"
        />
      </div>

      <div className="space-y-2">
        <Label>Durée (minutes)</Label>
        <Input
          type="number"
          value={answers.duration}
          onChange={(e) => setAnswers({...answers, duration: e.target.value})}
          min="30"
          max="120"
          step="15"
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Génération en cours..." : "Générer la séance"}
      </Button>
    </form>
  )
}
