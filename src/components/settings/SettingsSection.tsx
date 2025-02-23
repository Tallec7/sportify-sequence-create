
import { ReactNode } from "react"

interface SettingsSectionProps {
  title?: string
  description?: string
  children: ReactNode
}

export const SettingsSection = ({ title, description, children }: SettingsSectionProps) => {
  return (
    <div className="space-y-6">
      {(title || description) && (
        <div className="space-y-1">
          {title && <h3 className="text-lg font-medium">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      {children}
    </div>
  )
}
