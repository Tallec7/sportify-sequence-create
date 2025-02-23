
import { TableCell, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Shield, TestTube, Zap, CloudCog, Sparkles } from "lucide-react"
import type { PromptTemplate } from "../types"

interface PromptTableRowProps {
  template: PromptTemplate
  onEdit: (template: PromptTemplate) => void
  onTest: (template: PromptTemplate) => void
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

export const PromptTableRow = ({ template, onEdit, onTest }: PromptTableRowProps) => {
  return (
    <TableRow className={template.is_default ? "bg-red-50" : undefined}>
      <TableCell>{template.sports?.label || "Tous les sports"}</TableCell>
      <TableCell>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge variant="secondary" className="gap-2 capitalize">
                {getModeIcon(template.mode)}
                {template.mode}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>{getModeDescription(template.mode)}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      <TableCell>{template.training_type}</TableCell>
      <TableCell>
        <Badge variant={template.is_active ? "default" : "secondary"}>
          {template.is_active ? "Actif" : "Inactif"}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge variant={template.is_validated ? "default" : "destructive"}>
          {template.is_validated ? "Validé" : "Non validé"}
        </Badge>
      </TableCell>
      <TableCell>
        {template.is_default && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge variant="outline" className="gap-2 bg-red-50">
                  <Shield className="h-4 w-4" />
                  Protégé
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ce prompt système est critique et ne peut pas être supprimé.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit(template)}
            className="w-16"
          >
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onTest(template)}
            className="w-16"
          >
            <TestTube className="h-4 w-4 mr-1" />
            Test
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}

