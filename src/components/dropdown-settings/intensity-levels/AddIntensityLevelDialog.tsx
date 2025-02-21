
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"

interface AddIntensityLevelDialogProps {
  newValue: string
  newLabel: string
  onNewValueChange: (value: string) => void
  onNewLabelChange: (value: string) => void
  onCancel: () => void
  onAdd: () => void
}

export const AddIntensityLevelDialog = ({
  newValue,
  newLabel,
  onNewValueChange,
  onNewLabelChange,
  onCancel,
  onAdd,
}: AddIntensityLevelDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un niveau d'intensité
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un nouveau niveau d'intensité</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Identifiant unique</Label>
            <Input
              value={newValue}
              onChange={(e) => onNewValueChange(e.target.value)}
              placeholder="faible"
            />
          </div>
          <div>
            <Label>Nom affiché</Label>
            <Input
              value={newLabel}
              onChange={(e) => onNewLabelChange(e.target.value)}
              placeholder="Faible"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onCancel}>
              Annuler
            </Button>
            <Button onClick={onAdd}>
              Ajouter
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

