
import { ReactNode } from "react"

interface SettingsSectionProps {
  title?: string
  description?: string
  children: ReactNode
}

export const SettingsSection = ({ title, description, children }: SettingsSectionProps) => {
  return (
    <section 
      className="space-y-6"
      role="region"
      aria-labelledby={title ? "settings-section-title" : undefined}
      aria-describedby={description ? "settings-section-description" : undefined}
    >
      {(title || description) && (
        <div className="space-y-1">
          {title && (
            <h3 
              id="settings-section-title" 
              className="text-lg font-medium text-foreground"
            >
              {title}
            </h3>
          )}
          {description && (
            <p 
              id="settings-section-description"
              className="text-sm text-muted-foreground"
            >
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  )
}
