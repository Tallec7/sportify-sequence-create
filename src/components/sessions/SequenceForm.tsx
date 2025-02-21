
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { ExerciseForm } from "./ExerciseForm"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"

export interface Sequence {
  id?: string
  title: string
  description: string
  duration: number
  sequence_type: "warmup" | "main" | "cooldown"
  intensity_level: string
  sequence_order: number
  session_id?: string
}

interface SequenceFormProps {
  sequences: Sequence[]
  onAddSequence: (sequence: Sequence) => void
}

export const SequenceForm = ({ sequences, onAddSequence }: SequenceFormProps) => {
  const [newSequence, setNewSequence] = useState<Sequence>({
    title: "",
    description: "",
    duration: 15,
    sequence_type: "main",
    intensity_level: "medium",
    sequence_order: sequences.length + 1,
  })
  const [selectedSequenceId, setSelectedSequenceId] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data: sequence, error } = await supabase
        .from("session_sequences")
        .insert([newSequence])
        .select()
        .single()

      if (error) throw error

      // Assurez-vous que sequence_type est correctement typé avant d'appeler onAddSequence
      if (sequence && (sequence.sequence_type === "warmup" || sequence.sequence_type === "main" || sequence.sequence_type === "cooldown")) {
        onAddSequence(sequence as Sequence)
        toast({
          title: "Succès",
          description: "La séquence a été ajoutée avec succès.",
        })

        setNewSequence({
          title: "",
          description: "",
          duration: 15,
          sequence_type: "main",
          intensity_level: "medium",
          sequence_order: sequences.length + 2,
        })
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message,
      })
    }
  }

  return (
    <div className="space-y-8">
      <div className="rounded-xl border bg-card p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Séquences</h2>
          <p className="text-muted-foreground">
            Ajoutez et organisez les séquences de votre séance
          </p>
        </div>

        <div className="space-y-6">
          {sequences.map((sequence, index) => (
            <div
              key={sequence.id || index}
              className="rounded-lg border bg-background p-6"
            >
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{sequence.title}</h3>
                    <div className="flex gap-2 text-sm text-muted-foreground">
                      <span>{sequence.duration} min</span>
                      <span>•</span>
                      <span className="capitalize">{sequence.sequence_type}</span>
                      <span>•</span>
                      <span className="capitalize">
                        Intensité {sequence.intensity_level}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setSelectedSequenceId(
                        selectedSequenceId === sequence.id ? null : sequence.id
                      )
                    }
                  >
                    {selectedSequenceId === sequence.id
                      ? "Masquer les exercices"
                      : "Voir les exercices"}
                  </Button>
                </div>
                {sequence.description && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {sequence.description}
                  </p>
                )}
              </div>
              {selectedSequenceId === sequence.id && sequence.id && (
                <ExerciseForm
                  sequenceId={sequence.id}
                  exercises={[]}
                  onExerciseAdded={() => {}}
                />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Titre</Label>
              <Input
                id="title"
                value={newSequence.title}
                onChange={(e) =>
                  setNewSequence({ ...newSequence, title: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sequence_type">Type de séquence</Label>
              <Select
                value={newSequence.sequence_type}
                onValueChange={(value: "warmup" | "main" | "cooldown") =>
                  setNewSequence({ ...newSequence, sequence_type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="warmup">Échauffement</SelectItem>
                  <SelectItem value="main">Principal</SelectItem>
                  <SelectItem value="cooldown">Retour au calme</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Durée (minutes)</Label>
              <Input
                id="duration"
                type="number"
                min="1"
                value={newSequence.duration}
                onChange={(e) =>
                  setNewSequence({
                    ...newSequence,
                    duration: parseInt(e.target.value) || 0,
                  })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="intensity_level">Niveau d'intensité</Label>
              <Select
                value={newSequence.intensity_level}
                onValueChange={(value) =>
                  setNewSequence({ ...newSequence, intensity_level: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une intensité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Faible</SelectItem>
                  <SelectItem value="medium">Moyenne</SelectItem>
                  <SelectItem value="high">Élevée</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              value={newSequence.description}
              onChange={(e) =>
                setNewSequence({ ...newSequence, description: e.target.value })
              }
              className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
            />
          </div>
          <div>
            <Button type="submit" className="gap-2">
              <Plus className="h-4 w-4" />
              Ajouter la séquence
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
