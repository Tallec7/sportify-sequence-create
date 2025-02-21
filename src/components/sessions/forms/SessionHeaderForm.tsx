
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"

interface SessionHeaderFormProps {
  onSave: () => void
}

export const SessionHeaderForm = ({ onSave }: SessionHeaderFormProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
          Nouvelle séance
        </h1>
        <p className="text-muted-foreground mt-2">
          Créez une nouvelle séance d'entraînement personnalisée
        </p>
      </div>
      <Button onClick={onSave} size="lg" className="gap-2">
        <Save className="h-5 w-5" />
        Sauvegarder
      </Button>
    </div>
  )
}
