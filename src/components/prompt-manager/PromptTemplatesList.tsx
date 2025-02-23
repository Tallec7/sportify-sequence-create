import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { PromptTemplateDialog } from "./PromptTemplateDialog"
import type { Sport } from "@/hooks/queries/useSportsQuery"

interface PromptTemplate {
  id: string
  prompt_text: string
  training_type: string
  is_active: boolean
  is_validated: boolean
  sport_id: string | null
  sports: { label: string } | null
}

interface Template extends PromptTemplate {}

interface PromptTemplatesListProps {
  templates: Template[]
  sports: Sport[]
  isLoading: boolean
}

export const PromptTemplatesList = ({ templates, sports, isLoading }: PromptTemplatesListProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)

  const handleEdit = (template: Template) => {
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
        <Button onClick={handleCreate}>
          Create Template
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sport</TableHead>
            <TableHead>Training Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Validation</TableHead>
            <TableHead className="w-24">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {templates.map((template) => (
            <TableRow key={template.id}>
              <TableCell>{template.sports?.label || "All Sports"}</TableCell>
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
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(template)}
                >
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
