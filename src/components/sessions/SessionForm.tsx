
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Nouvelle séance</h1>
        <Button onClick={onSave} className="gap-2">
          <Save className="h-5 w-5" />
          Sauvegarder
        </Button>
      </div>
      <div className="rounded-lg border p-8">
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Titre</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Titre de la séance"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sport">Sport</Label>
              <Select name="sport" onValueChange={(value) => handleSelectChange("sport", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un sport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="football">Football</SelectItem>
                  <SelectItem value="basketball">Basketball</SelectItem>
                  <SelectItem value="tennis">Tennis</SelectItem>
                  <SelectItem value="athletisme">Athlétisme</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="level">Niveau</Label>
              <Select name="level" onValueChange={(value) => handleSelectChange("level", value)}>
                <SelectTrigger>
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
              <Label htmlFor="duration">Durée (minutes)</Label>
              <Input
                id="duration"
                name="duration"
                type="number"
                min="1"
                value={formData.duration}
                onChange={handleNumberChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="participants_min">Nombre minimum de participants</Label>
              <Input
                id="participants_min"
                name="participants_min"
                type="number"
                min="1"
                value={formData.participants_min}
                onChange={handleNumberChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="participants_max">Nombre maximum de participants</Label>
              <Input
                id="participants_max"
                name="participants_max"
                type="number"
                min="1"
                value={formData.participants_max}
                onChange={handleNumberChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description détaillée de la séance"
              className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

