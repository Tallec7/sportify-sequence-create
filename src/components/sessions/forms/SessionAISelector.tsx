
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export type AIMode = "express" | "expert" | "creativity" | "manual"

interface SessionAISelectorProps {
  selectedMode: AIMode
  onModeSelect: (mode: AIMode) => void
}

export const SessionAISelector = ({
  selectedMode,
  onModeSelect,
}: SessionAISelectorProps) => {
  return (
    <div className="space-y-4 p-4 bg-muted/50 rounded-lg mb-6">
      <div>
        <Label className="text-base">Mode de création</Label>
        <p className="text-sm text-muted-foreground mb-4">
          Choisissez comment vous souhaitez créer votre séance
        </p>
      </div>
      
      <Select value={selectedMode} onValueChange={(value) => onModeSelect(value as AIMode)}>
        <SelectTrigger>
          <SelectValue placeholder="Sélectionnez un mode" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="manual">Manuel - Création classique</SelectItem>
          <SelectItem value="express">IA Express - Création rapide</SelectItem>
          <SelectItem value="expert">IA Expert - Création optimisée</SelectItem>
          <SelectItem value="creativity">IA Créativité - Innovation</SelectItem>
        </SelectContent>
      </Select>

      <div className="text-sm text-muted-foreground">
        {selectedMode === "express" && (
          "Générez rapidement une séance en répondant à quelques questions essentielles"
        )}
        {selectedMode === "expert" && (
          "Créez une séance optimisée en tenant compte de tous les paramètres des joueurs"
        )}
        {selectedMode === "creativity" && (
          "Explorez de nouvelles approches en combinant différentes tactiques et exercices"
        )}
        {selectedMode === "manual" && (
          "Créez votre séance manuellement avec un contrôle total sur tous les aspects"
        )}
      </div>
    </div>
  )
}
