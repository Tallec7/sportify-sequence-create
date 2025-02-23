
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

interface SessionExpressFormProps {
  onGenerate: (answers: any) => void
  isLoading: boolean
}

export const SessionExpressForm = ({ onGenerate, isLoading }: SessionExpressFormProps) => {
  const [answers, setAnswers] = useState({
    sport: "",
    level: "",
    participants: "10",
    duration: "60"
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onGenerate(answers)
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
            <SelectItem value="football">Football</SelectItem>
            <SelectItem value="basketball">Basketball</SelectItem>
            <SelectItem value="handball">Handball</SelectItem>
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
            <SelectItem value="débutant">Débutant</SelectItem>
            <SelectItem value="intermédiaire">Intermédiaire</SelectItem>
            <SelectItem value="avancé">Avancé</SelectItem>
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
