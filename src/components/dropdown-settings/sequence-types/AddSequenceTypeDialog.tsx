
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { useState } from "react"

interface AddSequenceTypeDialogProps {
  newValue: string
  newLabel: string
  onNewValueChange: (value: string) => void
  onNewLabelChange: (value: string) => void
  onCancel: () => void
  onAdd: () => void
}

export const AddSequenceTypeDialog = ({
  newValue,
  newLabel,
  onNewValueChange,
  onNewLabelChange,
  onCancel,
  onAdd,
}: AddSequenceTypeDialogProps) => {
  const [open, setOpen] = useState(false)

  const handleAdd = () => {
    onAdd()
    setOpen(false)
  }

  const handleCancel = () => {
    onCancel()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un type
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un type de séquence</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="value">Valeur</Label>
            <Input
              id="value"
              value={newValue}
              onChange={(e) => onNewValueChange(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="label">Label</Label>
            <Input
              id="label"
              value={newLabel}
              onChange={(e) => onNewLabelChange(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleCancel}>
              Annuler
            </Button>
            <Button onClick={handleAdd}>
              Ajouter
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
