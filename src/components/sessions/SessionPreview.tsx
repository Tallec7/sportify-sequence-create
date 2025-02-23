
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ViewSessionSequences } from "./ViewSessionSequences"
import { Sequence } from "@/types/sequence"

interface SessionPreviewProps {
  generatedSession: {
    title: string;
    description: string;
    sport: string;
    level: string;
    duration: number;
    intensity_level: string;
    sequences: Sequence[];
  };
  onEdit: (editedSession: any) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const SessionPreview = ({ 
  generatedSession, 
  onEdit, 
  onSave, 
  onCancel 
}: SessionPreviewProps) => {
  const [session, setSession] = useState(generatedSession)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const newValue = e.target.type === 'number' ? Number(value) : value
    const updatedSession = {
      ...session,
      [name]: newValue
    }
    setSession(updatedSession)
    onEdit(updatedSession)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Prévisualisation de la séance</CardTitle>
          <CardDescription>
            Vérifiez et modifiez les détails de la séance générée avant de l'enregistrer
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre</Label>
              <Input
                id="title"
                name="title"
                value={session.title || ''}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={session.description || ''}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Sport</Label>
                <Input
                  name="sport"
                  value={session.sport || ''}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              
              <div className="space-y-2">
                <Label>Niveau</Label>
                <Input
                  name="level"
                  value={session.level || ''}
                  onChange={handleChange}
                  readOnly
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Durée (minutes)</Label>
                <Input
                  type="number"
                  name="duration"
                  value={session.duration || 0}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Intensité</Label>
                <Input
                  name="intensity_level"
                  value={session.intensity_level || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {session.sequences && session.sequences.length > 0 && (
            <ViewSessionSequences sequences={session.sequences} />
          )}

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onCancel}>
              Annuler
            </Button>
            <Button onClick={onSave}>
              Enregistrer la séance
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
