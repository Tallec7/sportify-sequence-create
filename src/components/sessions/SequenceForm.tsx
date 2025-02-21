
import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ExerciseForm, Exercise } from "./ExerciseForm"

export interface Sequence {
  id?: string
  title: string
  description: string
  duration: number
  sequence_type: string
  intensity_level: string
  sequence_order: number
}

interface SequenceFormProps {
  sequences: Sequence[]
  onAddSequence: (sequence: Sequence) => void
}

export const SequenceForm = ({ sequences, onAddSequence }: SequenceFormProps) => {
  const [newSequence, setNewSequence] = React.useState<Sequence>({
    title: "",
    description: "",
    duration: 10,
    sequence_type: "warmup",
    intensity_level: "medium",
    sequence_order: sequences.length + 1,
  })

  const [selectedSequenceId, setSelectedSequenceId] = useState<string | null>(null)
  const [sequenceExercises, setSequenceExercises] = useState<{ [key: string]: Exercise[] }>({})

  useEffect(() => {
    const fetchExercises = async () => {
      for (const sequence of sequences) {
        if (sequence.id) {
          const { data: exercises, error } = await supabase
            .from("exercises")
            .select("*")
            .eq("sequence_id", sequence.id)
            .order("exercise_order", { ascending: true })

          if (!error && exercises) {
            setSequenceExercises(prev => ({
              ...prev,
              [sequence.id!]: exercises
            }))
          }
        }
      }
    }

    fetchExercises()
  }, [sequences])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddSequence(newSequence)
    setNewSequence({
      title: "",
      description: "",
      duration: 10,
      sequence_type: "warmup",
      intensity_level: "medium",
      sequence_order: sequences.length + 2,
    })
  }

  const handleExerciseAdded = (sequenceId: string) => (exercise: Exercise) => {
    setSequenceExercises(prev => ({
      ...prev,
      [sequenceId]: [...(prev[sequenceId] || []), exercise]
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Séquences</h3>
          <p className="text-sm text-muted-foreground">
            Ajoutez des séquences à votre séance
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            {sequences.length} séquence{sequences.length !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      {sequences.length > 0 && (
        <div className="grid gap-4">
          {sequences.map((sequence, index) => (
            <div
              key={index}
              className="space-y-4 rounded-lg border p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex-1 space-y-1">
                  <h4 className="font-medium">{sequence.title}</h4>
                  <div className="flex gap-2 text-sm text-muted-foreground">
                    <span>{sequence.duration} min</span>
                    <span>•</span>
                    <span className="capitalize">{sequence.sequence_type}</span>
                    <span>•</span>
                    <span className="capitalize">{sequence.intensity_level}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setSelectedSequenceId(sequence.id === selectedSequenceId ? null : sequence.id)}
                >
                  {sequence.id === selectedSequenceId ? "Masquer les exercices" : "Gérer les exercices"}
                </Button>
              </div>

              {sequence.id && sequence.id === selectedSequenceId && (
                <ExerciseForm
                  sequenceId={sequence.id}
                  exercises={sequenceExercises[sequence.id] || []}
                  onExerciseAdded={handleExerciseAdded(sequence.id)}
                />
              )}
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border p-4">
        <h4 className="font-medium">Nouvelle séquence</h4>
        <div className="grid gap-4 md:grid-cols-2">
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
            <Label htmlFor="sequence_type">Type de séquence</Label>
            <Select
              value={newSequence.sequence_type}
              onValueChange={(value) =>
                setNewSequence({ ...newSequence, sequence_type: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="warmup">Échauffement</SelectItem>
                <SelectItem value="technical">Technique</SelectItem>
                <SelectItem value="tactical">Tactique</SelectItem>
                <SelectItem value="physical">Physique</SelectItem>
                <SelectItem value="game">Jeu</SelectItem>
                <SelectItem value="cooldown">Retour au calme</SelectItem>
              </SelectContent>
            </Select>
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
        <div className="flex justify-end">
          <Button type="submit" className="gap-2">
            <Plus className="h-4 w-4" />
            Ajouter la séquence
          </Button>
        </div>
      </form>
    </div>
  )
}
