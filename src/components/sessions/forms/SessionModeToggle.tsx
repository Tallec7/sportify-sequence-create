
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface SessionModeToggleProps {
  isAdvancedMode: boolean
  onModeChange: (value: boolean) => void
}

export const SessionModeToggle = ({ isAdvancedMode, onModeChange }: SessionModeToggleProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg mb-6">
      <div className="space-y-0.5">
        <Label className="text-base">Mode avancé</Label>
        <p className="text-sm text-muted-foreground">
          Activez pour accéder aux options avancées et à la génération IA
        </p>
      </div>
      <Switch
        checked={isAdvancedMode}
        onCheckedChange={onModeChange}
        aria-label="Toggle advanced mode"
      />
    </div>
  )
}
