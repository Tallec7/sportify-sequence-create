
import { UseFormReturn } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { Sport } from "@/types/settings"
import type { PromptTemplateFormValues } from "./types"

interface PromptTemplateFormProps {
  form: UseFormReturn<PromptTemplateFormValues>
  sports: Sport[]
  onCancel: () => void
  isEditing: boolean
  onSubmit: (values: PromptTemplateFormValues) => void
}

export const PromptTemplateForm = ({ form, sports, onCancel, isEditing, onSubmit }: PromptTemplateFormProps) => {
  const isDefault = form.watch("is_default")

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {isDefault && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            This is a critical system prompt used for core functionality. 
            Changes will affect how sessions are generated.
          </AlertDescription>
        </Alert>
      )}

      <FormField
        control={form.control}
        name="sport_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sport (optional)</FormLabel>
            <Select
              value={field.value || "null"}
              onValueChange={(value) => field.onChange(value === "null" ? null : value)}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a sport" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="null">All Sports</SelectItem>
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
        name="mode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mode</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select generation mode" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="express">Express</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
                <SelectItem value="creativity">Creativity</SelectItem>
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

      <div className="flex items-center gap-8">
        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <FormLabel>Active</FormLabel>
              </div>
              <FormControl>
                <Switch 
                  checked={field.value} 
                  onCheckedChange={field.onChange}
                  disabled={isDefault} // Prevent disabling system prompts
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="is_validated"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <FormLabel>Validated</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={!form.getValues("is_active")}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{isEditing ? "Update" : "Create"}</Button>
      </div>
    </form>
  )
}
