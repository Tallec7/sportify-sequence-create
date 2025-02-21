
import { Exercise } from "@/types/sequence"
import { exerciseTemplates } from "./templates/exercise-templates"
import { situationTemplates } from "./templates/situation-templates"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface ExerciseTemplateSelectorProps {
  activityType: "exercise" | "situation"
  onSelectTemplate: (template: Partial<Exercise>) => void
}

export const ExerciseTemplateSelector = ({
  activityType,
  onSelectTemplate
}: ExerciseTemplateSelectorProps) => {
  const templates = activityType === "exercise" ? exerciseTemplates : situationTemplates

  return (
    <div className="space-y-2">
      <Label>Utiliser un modèle</Label>
      <Select
        onValueChange={(value) => {
          const template = templates.find((t, index) => index.toString() === value)
          if (template) {
            onSelectTemplate(template)
          }
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Sélectionner un modèle" />
        </SelectTrigger>
        <SelectContent>
          {templates.map((template, index) => (
            <SelectItem key={index} value={index.toString()}>
              {template.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

