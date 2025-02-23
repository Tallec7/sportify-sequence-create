
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useSportsQuery } from "@/hooks/queries/useSportsQuery"
import { useLevelsQuery } from "@/hooks/queries/useLevelsQuery"
import { useIntensityLevelsQuery } from "@/hooks/queries/useIntensityLevelsQuery"
import { useAgeCategoriesQuery } from "@/hooks/queries/useAgeCategoriesQuery"

interface SessionExpertFormProps {
  onGenerate: (answers: any) => void
  isLoading: boolean
}

export const SessionExpertForm = ({ onGenerate, isLoading }: SessionExpertFormProps) => {
  const { data: sports = [] } = useSportsQuery()
  const { data: levels = [] } = useLevelsQuery()
  const { data: intensityLevels = [] } = useIntensityLevelsQuery()
  const { data: ageCategories = [] } = useAgeCategoriesQuery()
  
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
              {intensityLevels.map((intensity) => (
                <SelectItem key={intensity.id} value={intensity.value}>
                  {intensity.label}
                </SelectItem>
              ))}
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
              {ageCategories.map((category) => (
                <SelectItem key={category.id} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Objectifs spécifiques</Label>
        <Textarea
          value={answers.objectives}
          onChange={(e) => setAnswers({...answers, objectives: e.target.value})}
          placeholder="Décrivez les objectifs spécifiques de la séance"
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Génération en cours..." : "Générer la séance"}
      </Button>
    </form>
  )
}

