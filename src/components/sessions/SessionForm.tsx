
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface SessionFormData {
  title: string
  description: string
  sport: string
  level: string
  duration: number
  participants_min: number
  participants_max: number
  age_category: string
  intensity_level: string
  cycle_id?: string | null
}

interface SessionFormProps {
  onSave: () => void
  formData: SessionFormData
  setFormData: (data: SessionFormData) => void
}

export const SessionForm = ({ onSave, formData, setFormData }: SessionFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: parseInt(value) || 0
    })
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
            Nouvelle séance
          </h1>
          <p className="text-muted-foreground mt-2">
            Créez une nouvelle séance d'entraînement personnalisée
          </p>
        </div>
        <Button onClick={onSave} size="lg" className="gap-2">
          <Save className="h-5 w-5" />
          Sauvegarder
        </Button>
      </div>
      <div className="rounded-xl border bg-card p-8 shadow-sm">
        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base">Titre</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Titre de la séance"
                className="h-12"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sport" className="text-base">Sport</Label>
              <Select name="sport" onValueChange={(value) => handleSelectChange("sport", value)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Sélectionnez un sport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="football">Football</SelectItem>
                  <SelectItem value="basketball">Basketball</SelectItem>
                  <SelectItem value="tennis">Tennis</SelectItem>
                  <SelectItem value="athletisme">Athlétisme</SelectItem>
                  <SelectItem value="handball">Handball</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="level" className="text-base">Niveau</Label>
              <Select name="level" onValueChange={(value) => handleSelectChange("level", value)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Sélectionnez un niveau" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="debutant">Débutant</SelectItem>
                  <SelectItem value="intermediaire">Intermédiaire</SelectItem>
                  <SelectItem value="avance">Avancé</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="age_category" className="text-base">Catégorie d'âge</Label>
              <Select name="age_category" onValueChange={(value) => handleSelectChange("age_category", value)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Sélectionnez une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="U13">U13</SelectItem>
                  <SelectItem value="U15">U15</SelectItem>
                  <SelectItem value="U18">U18</SelectItem>
                  <SelectItem value="senior">Senior</SelectItem>
                  <SelectItem value="pro">Pro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="intensity_level" className="text-base">Intensité</Label>
              <Select name="intensity_level" onValueChange={(value) => handleSelectChange("intensity_level", value)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Sélectionnez l'intensité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Faible</SelectItem>
                  <SelectItem value="medium">Moyenne</SelectItem>
                  <SelectItem value="high">Élevée</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration" className="text-base">Durée (minutes)</Label>
              <Input
                id="duration"
                name="duration"
                type="number"
                min="1"
                className="h-12"
                value={formData.duration}
                onChange={handleNumberChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="participants_min" className="text-base">Nombre minimum de participants</Label>
              <Input
                id="participants_min"
                name="participants_min"
                type="number"
                min="1"
                className="h-12"
                value={formData.participants_min}
                onChange={handleNumberChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="participants_max" className="text-base">Nombre maximum de participants</Label>
              <Input
                id="participants_max"
                name="participants_max"
                type="number"
                min="1"
                className="h-12"
                value={formData.participants_max}
                onChange={handleNumberChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-base">Description</Label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description détaillée de la séance"
              className="w-full min-h-[150px] rounded-md border border-input bg-background px-4 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
            />
          </div>
        </form>
      </div>
    </div>
  )
}
