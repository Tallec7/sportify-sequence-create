
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"

interface AddLevelDialogProps {
  newValue: string
  newLabel: string
  onNewValueChange: (value: string) => void
  onNewLabelChange: (value: string) => void
  onCancel: () => void
  onAdd: () => void
}

export const AddLevelDialog = ({
  newValue,
  newLabel,
  onNewValueChange,
  onNewLabelChange,
  onCancel,
  onAdd,
}: AddLevelDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un niveau
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un nouveau niveau</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Identifiant unique</Label>
            <Input
              value={newValue}
              onChange={(e) => onNewValueChange(e.target.value)}
              placeholder="debutant"
            />
          </div>
          <div>
            <Label>Nom affiché</Label>
            <Input
              value={newLabel}
              onChange={(e) => onNewLabelChange(e.target.value)}
              placeholder="Débutant"
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
