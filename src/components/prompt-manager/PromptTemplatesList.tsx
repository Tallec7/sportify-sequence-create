
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/use-toast"
import { PromptTemplateDialog } from "./PromptTemplateDialog"
import { PromptFilters } from "./filters/PromptFilters"
import { PromptTableHeader } from "./table/PromptTableHeader"
import { PromptTableRow } from "./table/PromptTableRow"
import { usePromptTemplateDeleteMutation } from "@/hooks/mutations/usePromptTemplateDeleteMutation"
import { supabase } from "@/integrations/supabase/client"
import type { Sport } from "@/types/settings"
import type { PromptTemplate, SortField, SortOrder } from "./types"

interface PromptTemplatesListProps {
  templates: PromptTemplate[]
  sports: Sport[]
  isLoading: boolean
}

export const PromptTemplatesList = ({ templates, sports, isLoading }: PromptTemplatesListProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null)
  const [filterSport, setFilterSport] = useState<string>('all')
  const [filterMode, setFilterMode] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [sortField, setSortField] = useState<SortField>('updated_at')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  
  const deleteMutation = usePromptTemplateDeleteMutation()

  const handleEdit = (template: PromptTemplate) => {
    setSelectedTemplate(template)
    setIsDialogOpen(true)
  }

  const handleCreate = () => {
    setSelectedTemplate(null)
    setIsDialogOpen(true)
  }

  const handleDelete = (template: PromptTemplate) => {
    // On ne peut pas supprimer les prompts protégés
    if (template.is_default) {
      toast({
        variant: "destructive",
        title: "Action non autorisée",
        description: "Les prompts système protégés ne peuvent pas être supprimés"
      })
      return
    }

    deleteMutation.mutate(template)
  }

  const handleTest = async (template: PromptTemplate) => {
    try {
      toast({
        title: "Test du prompt en cours...",
        description: `Envoi d'une requête test pour ${template.training_type}`
      })
      
      const { error } = await supabase.functions.invoke('generate-session', {
        body: { 
          mode: template.mode,
          prompt: template.prompt_text,
          test: true
        }
      })

      if (error) throw error

      toast({
        title: "Test réussi",
        description: "Le prompt a été testé avec succès"
      })
    } catch (error) {
      console.error('Erreur de test:', error)
      toast({
        variant: "destructive",
        title: "Échec du test",
        description: error.message || "Une erreur s'est produite lors du test du prompt"
      })
    }
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('desc')
    }
  }

  const filteredAndSortedTemplates = templates
    .filter(template => {
      if (filterSport !== 'all' && template.sport_id !== filterSport) return false
      if (filterMode !== 'all' && template.mode !== filterMode) return false
      if (search && !template.training_type.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
    .sort((a, b) => {
      if (sortField === 'updated_at') {
        return sortOrder === 'desc' 
          ? new Date(b.updated_at || '').getTime() - new Date(a.updated_at || '').getTime()
          : new Date(a.updated_at || '').getTime() - new Date(b.updated_at || '').getTime()
      }
      if (sortField === 'mode') {
        return sortOrder === 'desc'
          ? b.mode.localeCompare(a.mode)
          : a.mode.localeCompare(b.mode)
      }
      if (sortField === 'sport') {
        const aSport = a.sports?.label || ''
        const bSport = b.sports?.label || ''
        return sortOrder === 'desc'
          ? bSport.localeCompare(aSport)
          : aSport.localeCompare(bSport)
      }
      return 0
    })

  if (isLoading) {
    return <Skeleton className="h-48 w-full" />
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <PromptFilters
          search={search}
          setSearch={setSearch}
          filterSport={filterSport}
          setFilterSport={setFilterSport}
          filterMode={filterMode}
          setFilterMode={setFilterMode}
          sports={sports}
        />
        <Button onClick={handleCreate}>Créer un modèle</Button>
      </div>

      <Table>
        <PromptTableHeader
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
        />
        <TableBody>
          {filteredAndSortedTemplates.map((template) => (
            <PromptTableRow
              key={template.id}
              template={template}
              onEdit={handleEdit}
              onTest={handleTest}
              onDelete={handleDelete}
            />
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
