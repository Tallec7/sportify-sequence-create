
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { PromptTemplateForm } from "./PromptTemplateForm"
import { usePromptTemplate } from "./usePromptTemplate"
import type { PromptTemplateDialogProps } from "./types"

export const PromptTemplateDialog = ({
  template,
  sports,
  open,
  onOpenChange
}: PromptTemplateDialogProps) => {
  const { form, onSubmit } = usePromptTemplate({ template, onOpenChange })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{template ? "Edit Template" : "Create Template"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <PromptTemplateForm
            form={form}
            sports={sports}
            onCancel={() => onOpenChange(false)}
            isEditing={!!template}
          />
        </Form>
      </DialogContent>
    </Dialog>
  )
}
