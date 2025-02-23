
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import type { Sport } from "@/hooks/queries/useSportsQuery"

const formSchema = z.object({
  sport_id: z.string().nullable(),
  training_type: z.string().min(1, "Training type is required"),
  prompt_text: z.string().min(1, "Prompt text is required"),
  is_active: z.boolean()
})

type FormValues = z.infer<typeof formSchema>

interface PromptTemplateDialogProps {
  template: {
    id: string
    prompt_text: string
    training_type: string
    is_active: boolean
    sport_id: string | null
  } | null
  sports: Sport[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const PromptTemplateDialog = ({
  template,
  sports,
  open,
  onOpenChange
}: PromptTemplateDialogProps) => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: template || {
      sport_id: null,
      training_type: "",
      prompt_text: "",
      is_active: true
    }
  })

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      if (template) {
        // Update existing template
        const { error } = await supabase
          .from("prompt_templates")
          .update(values)
          .eq("id", template.id)

        if (error) throw error
      } else {
        // Create new template
        const { error } = await supabase
          .from("prompt_templates")
          .insert([values])

        if (error) throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prompt-templates"] })
      toast({
        title: "Success",
        description: `Template ${template ? "updated" : "created"} successfully`
      })
      onOpenChange(false)
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${template ? "update" : "create"} template: ${error.message}`
      })
    }
  })

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{template ? "Edit Template" : "Create Template"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="sport_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sport (optional)</FormLabel>
                  <Select
                    value={field.value || ""}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a sport" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="">All Sports</SelectItem>
                      {sports.map((sport) => (
                        <SelectItem key={sport.id} value={sport.id}>
                          {sport.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="training_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Training Type</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., Technical, Tactical, Physical" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="prompt_text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prompt Text</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter the prompt template..."
                      className="min-h-[200px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {template ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

