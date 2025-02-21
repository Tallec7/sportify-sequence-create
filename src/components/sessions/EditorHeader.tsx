
import { SessionHeaderForm } from "./forms/SessionHeaderForm"
import { SessionFormData } from "./SessionForm"

interface EditorHeaderProps {
  isLoading: boolean
  onSave: () => void
  sessionId: string | undefined
}

export const EditorHeader = ({
  isLoading,
  onSave,
  sessionId,
}: EditorHeaderProps) => {
  if (isLoading) {
    return (
      <div className="h-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-full items-center justify-between gap-4">
          <div className="h-8 w-48 animate-pulse rounded-md bg-muted" />
          <div className="h-9 w-24 animate-pulse rounded-md bg-muted" />
        </div>
      </div>
    )
  }

  return (
    <SessionHeaderForm
      onSave={onSave}
      isEditing={!!sessionId}
    />
  )
}

