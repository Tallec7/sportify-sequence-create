
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useProgressionLevelUpdateMutation } from "@/hooks/mutations/useProgressionLevelUpdateMutation"

interface EditProgressionLevelDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  level: {
    id: string
    value: string
    label: string
  }
}

export const EditProgressionLevelDialog = ({ 
  open, 
  onOpenChange, 
  level 
}: EditProgressionLevelDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm({
    defaultValues: {
      value: level.value,
      label: level.label,
    },
  })
  const mutation = useProgressionLevelUpdateMutation()

  const onSubmit = async (values: { value: string; label: string }) => {
    setIsSubmitting(true)
    try {
      await mutation.mutateAsync({ id: level.id, ...values })
      onOpenChange(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier le niveau de progression</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valeur</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="niveau_1" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Libellé</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Niveau 1" />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                Enregistrer
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
