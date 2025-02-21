
import { useForm } from "react-hook-form"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"
import { useActivityTypeMutation } from "@/hooks/mutations/useActivityTypeMutation"

interface FormValues {
  value: string
  label: string
}

interface AddActivityTypeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const AddActivityTypeDialog = ({
  open,
  onOpenChange,
}: AddActivityTypeDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<FormValues>({
    defaultValues: {
      value: "",
      label: "",
    },
  })

  const { handleAddType } = useActivityTypeMutation(() => {
    form.reset()
    onOpenChange(false)
  })

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true)
    try {
      await handleAddType(values.value, values.label)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un type d'activité</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code unique</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="course_sprint" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom affiché</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Course sprint" />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Annuler
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                Ajouter
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
