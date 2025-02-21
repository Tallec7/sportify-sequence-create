
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"

interface SessionHeaderFormProps {
  onSave: () => void
  isEditing?: boolean
}

export const SessionHeaderForm = ({ onSave, isEditing }: SessionHeaderFormProps) => {
  return (
    <div className="h-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-full items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">
            {isEditing ? "Modifier la séance" : "Nouvelle séance"}
          </h1>
        </div>
        <Button onClick={onSave} size="default" className="gap-2">
          <Save className="h-4 w-4" />
          Sauvegarder
        </Button>
      </div>
    </div>
  )
}
