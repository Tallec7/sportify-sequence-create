
import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { useSportMutation } from "@/hooks/mutations/useSportMutation"

interface AddSportDialogProps {
  onSportsChange: () => void
}

export const AddSportDialog = ({ onSportsChange }: AddSportDialogProps) => {
  const [newSportValue, setNewSportValue] = useState("")
  const [newSportLabel, setNewSportLabel] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()
  const { addSport } = useSportMutation(onSportsChange)

  const handleAddSport = async () => {
    if (!newSportValue || !newSportLabel) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez remplir tous les champs"
      })
      return
    }

    const success = await addSport(newSportValue, newSportLabel)
    if (success) {
      setNewSportValue("")
      setNewSportLabel("")
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="hover:scale-105 transition-transform duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un sport
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ajouter un nouveau sport</DialogTitle>
          <DialogDescription>
            Remplissez les informations pour ajouter un nouveau sport à la liste
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Identifiant unique</Label>
            <Input
              value={newSportValue}
              onChange={(e) => setNewSportValue(e.target.value)}
              placeholder="handball"
              className="focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-muted-foreground">
              L'identifiant doit être unique et en minuscules, sans espaces
            </p>
          </div>
          <div className="space-y-2">
            <Label>Nom affiché</Label>
            <Input
              value={newSportLabel}
              onChange={(e) => setNewSportLabel(e.target.value)}
              placeholder="Handball"
              className="focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleAddSport}>
              Ajouter
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
