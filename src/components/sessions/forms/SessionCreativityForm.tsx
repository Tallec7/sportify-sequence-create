
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useSportsQuery } from "@/hooks/queries/useSportsQuery"
import { useLevelsQuery } from "@/hooks/queries/useLevelsQuery"

interface SessionCreativityFormProps {
  onGenerate: (answers: any) => void
  isLoading: boolean
}

export const SessionCreativityForm = ({ onGenerate, isLoading }: SessionCreativityFormProps) => {
  const sports = useSportsQuery()
  const levels = useLevelsQuery()

  const [answers, setAnswers] = useState({
    sport: "",
    level: "",
    duration: "60",
    style: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onGenerate(answers)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
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

      <div className="space-y-2">
        <Label>Style d'entraînement souhaité</Label>
        <Textarea
          value={answers.style}
          onChange={(e) => setAnswers({...answers, style: e.target.value})}
          placeholder="Décrivez le style d'entraînement que vous recherchez (ex: ludique, compétitif, tactique innovant...)"
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Génération en cours..." : "Générer la séance"}
      </Button>
    </form>
  )
}
