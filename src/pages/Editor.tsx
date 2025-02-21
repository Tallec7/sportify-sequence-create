
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Editor = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [userId, setUserId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    sport: "",
    level: "",
    duration: 60,
    participants_min: 1,
    participants_max: 10
  })

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        navigate("/auth")
      } else {
        setUserId(session.user.id)
      }
    }
    checkAuth()
  }, [navigate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: parseInt(value) || 0
    }))
  }

  const handleSave = async () => {
    try {
      const { data, error } = await supabase
        .from('sessions')
        .insert([
          {
            ...formData,
            user_id: userId
          }
        ])
        .select()
        .single()

      if (error) throw error

      toast({
        title: "Succès",
        description: "La séance a été sauvegardée avec succès.",
      })
      navigate("/dashboard")
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message,
      })
    }
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Nouvelle séance</h1>
        <Button onClick={handleSave} className="gap-2">
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

export default Editor
