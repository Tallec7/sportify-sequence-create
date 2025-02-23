
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

interface SessionExpertFormProps {
  onGenerate: (answers: any) => void
  isLoading: boolean
}

export const SessionExpertForm = ({ onGenerate, isLoading }: SessionExpertFormProps) => {
  const [answers, setAnswers] = useState({
    sport: "",
    level: "",
    participants: "10",
    duration: "60",
    objectives: "",
    intensity: "medium",
    ageCategory: "U13"
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
      </div>

      <div className="grid grid-cols-2 gap-4">
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
      </div>

      <div className="space-y-2">
        <Label>Objectifs de la séance</Label>
        <Textarea
          value={answers.objectives}
          onChange={(e) => setAnswers({...answers, objectives: e.target.value})}
          placeholder="Décrivez les objectifs principaux de la séance..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Intensité</Label>
          <Select
            value={answers.intensity}
            onValueChange={(value) => setAnswers({...answers, intensity: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choisir l'intensité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Faible</SelectItem>
              <SelectItem value="medium">Moyenne</SelectItem>
              <SelectItem value="high">Élevée</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Catégorie d'âge</Label>
          <Select
            value={answers.ageCategory}
            onValueChange={(value) => setAnswers({...answers, ageCategory: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choisir la catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="U9">U9</SelectItem>
              <SelectItem value="U11">U11</SelectItem>
              <SelectItem value="U13">U13</SelectItem>
              <SelectItem value="U15">U15</SelectItem>
              <SelectItem value="U17">U17</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Génération en cours..." : "Générer la séance"}
      </Button>
    </form>
  )
}
