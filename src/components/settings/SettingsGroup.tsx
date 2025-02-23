
import { ReactNode } from "react"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SettingsGroupProps {
  title: string
  description?: string
  children: ReactNode
}

export const SettingsGroup = ({ title, description, children }: SettingsGroupProps) => {
  return (
    <Card className="w-full" role="group" aria-labelledby="settings-group-title">
      <CardHeader>
        <CardTitle id="settings-group-title" className="text-lg">{title}</CardTitle>
        {description && (
          <p 
            className="text-sm text-muted-foreground"
            id="settings-group-description"
          >
            {description}
          </p>
        )}
      </CardHeader>
      <CardContent 
        className="space-y-4"
        role="region" 
        aria-labelledby="settings-group-title"
        aria-describedby={description ? "settings-group-description" : undefined}
      >
        {children}
      </CardContent>
    </Card>
  )
}
