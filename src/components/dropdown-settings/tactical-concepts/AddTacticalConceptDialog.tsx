
import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"

interface AddTacticalConceptDialogProps {
  selectedSport: string
  onConceptsChange: () => void
}

export const AddTacticalConceptDialog = ({ selectedSport, onConceptsChange }: AddTacticalConceptDialogProps) => {
  const [newConceptValue, setNewConceptValue] = useState("")
  const [newConceptLabel, setNewConceptLabel] = useState("")
  const [isAddingConcept, setIsAddingConcept] = useState(false)
  const { toast } = useToast()

  const handleAddConcept = async () => {
    if (!newConceptValue || !newConceptLabel || !selectedSport) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez remplir tous les champs et sélectionner un sport"
      })
      return
    }

    try {
      const { data: sportData } = await supabase
        .from('sports')
        .select('id')
        .eq('value', selectedSport)
        .single()

      if (!sportData) throw new Error("Sport non trouvé")

      const { error } = await supabase
        .from('tactical_concepts')
        .insert([{
          value: newConceptValue,
          label: newConceptLabel,
          sport_id: sportData.id
        }])

      if (error) throw error

      toast({
        title: "Concept tactique ajouté",
        description: `Le concept ${newConceptLabel} a été ajouté avec succès`
      })

      setNewConceptValue("")
      setNewConceptLabel("")
      setIsAddingConcept(false)
      onConceptsChange()
    } catch (error) {
      console.error('Error adding tactical concept:', error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'ajouter le concept tactique"
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsAddingConcept(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un concept
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un nouveau concept tactique</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Identifiant unique</Label>
            <Input
              value={newConceptValue}
              onChange={(e) => setNewConceptValue(e.target.value)}
              placeholder="defense_zone"
            />
          </div>
          <div>
            <Label>Nom affiché</Label>
            <Input
              value={newConceptLabel}
              onChange={(e) => setNewConceptLabel(e.target.value)}
              placeholder="Défense de zone"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsAddingConcept(false)}>
              Annuler
            </Button>
            <Button onClick={handleAddConcept}>
              Ajouter
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
