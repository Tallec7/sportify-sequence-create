
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CloudCog, Sparkles, Zap } from "lucide-react"
import type { PromptTemplate } from "../types"

interface PromptModeProps {
  mode: PromptTemplate['mode']
}

const getModeIcon = (mode: string) => {
  switch (mode) {
    case 'express':
      return <Zap className="h-4 w-4" />
    case 'expert':
      return <CloudCog className="h-4 w-4" />
    case 'creativity':
      return <Sparkles className="h-4 w-4" />
    default:
      return null
  }
}

const getModeDescription = (mode: string) => {
  switch (mode) {
    case 'express':
      return "Mode rapide - Génération de séance simplifiée"
    case 'expert':
      return "Mode expert - Génération détaillée et optimisée"
    case 'creativity':
      return "Mode créatif - Génération innovante"
    default:
      return ""
  }
}

export const PromptMode = ({ mode }: PromptModeProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge variant="secondary" className="gap-2 capitalize">
            {getModeIcon(mode)}
            {mode}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getModeDescription(mode)}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

