
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useActivityTypeMutation } from "@/hooks/mutations/useActivityTypeMutation"

interface AddActivityTypeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const AddActivityTypeDialog = ({
  open,
  onOpenChange,
}: AddActivityTypeDialogProps) => {
  const [value, setValue] = useState("")
  const [label, setLabel] = useState("")
  
  const { handleAddType } = useActivityTypeMutation(() => {
    setValue("")
    setLabel("")
    onOpenChange(false)
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await handleAddType()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un type d'activité</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Code unique"
            />
          </div>
          <div>
            <Input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Nom affiché"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">Ajouter</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
