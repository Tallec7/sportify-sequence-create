
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { AlertCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { PromptTemplateDialog } from "./PromptTemplateDialog"
import type { Sport } from "@/types/settings"
import type { PromptTemplate } from "./types"

interface PromptTemplatesListProps {
  templates: PromptTemplate[]
  sports: Sport[]
  isLoading: boolean
}

export const PromptTemplatesList = ({ templates, sports, isLoading }: PromptTemplatesListProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null)

  const handleEdit = (template: PromptTemplate) => {
    setSelectedTemplate(template)
    setIsDialogOpen(true)
  }

  const handleCreate = () => {
    setSelectedTemplate(null)
    setIsDialogOpen(true)
  }

  if (isLoading) {
    return <Skeleton className="h-48 w-full" />
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handleCreate}>Create Template</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sport</TableHead>
            <TableHead>Mode</TableHead>
            <TableHead>Training Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Validation</TableHead>
            <TableHead className="w-36">Type</TableHead>
            <TableHead className="w-24">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {templates.map((template) => (
            <TableRow key={template.id}>
              <TableCell>{template.sports?.label || "All Sports"}</TableCell>
              <TableCell>
                <Badge variant="secondary" className="capitalize">
                  {template.mode}
                </Badge>
              </TableCell>
              <TableCell>{template.training_type}</TableCell>
              <TableCell>
                <Badge variant={template.is_active ? "default" : "secondary"}>
                  {template.is_active ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={template.is_validated ? "default" : "destructive"}>
                  {template.is_validated ? "Validated" : "Not Validated"}
                </Badge>
              </TableCell>
              <TableCell>
                {template.is_default && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge variant="outline" className="gap-2">
                          <AlertCircle className="h-4 w-4" />
                          System Default
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>This is a critical system prompt. Edit with caution.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => handleEdit(template)}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PromptTemplateDialog
        template={selectedTemplate}
        sports={sports}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  )
}
