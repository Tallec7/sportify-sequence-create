
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"

interface AddActivityTypeDialogProps {
  newValue: string
  newLabel: string
  onNewValueChange: (value: string) => void
  onNewLabelChange: (value: string) => void
  onCancel: () => void
  onAdd: () => void
}

export const AddActivityTypeDialog = ({
  newValue,
  newLabel,
  onNewValueChange,
  onNewLabelChange,
  onCancel,
  onAdd,
}: AddActivityTypeDialogProps) => {
  return (
    <Dialog onOpenChange={(open) => !open && onCancel()}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un type d'activité</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Input
              value={newValue}
              onChange={(e) => onNewValueChange(e.target.value)}
              placeholder="Code unique (ex: exercise)"
            />
          </div>
          <div className="space-y-2">
            <Input
              value={newLabel}
              onChange={(e) => onNewLabelChange(e.target.value)}
              placeholder="Nom affiché (ex: Exercice)"
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
