
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Shield, TestTube, CloudCog, Sparkles, Zap, ChevronsUpDown } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"
import { PromptTemplateDialog } from "./PromptTemplateDialog"
import { supabase } from "@/integrations/supabase/client"
import type { Sport } from "@/types/settings"
import type { PromptTemplate } from "./types"

interface PromptTemplatesListProps {
  templates: PromptTemplate[]
  sports: Sport[]
  isLoading: boolean
}

type SortField = 'mode' | 'updated_at' | 'sport'
type SortOrder = 'asc' | 'desc'

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

export const PromptTemplatesList = ({ templates, sports, isLoading }: PromptTemplatesListProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null)
  const [filterSport, setFilterSport] = useState<string>('all')
  const [filterMode, setFilterMode] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [sortField, setSortField] = useState<SortField>('updated_at')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')

  const handleEdit = (template: PromptTemplate) => {
    setSelectedTemplate(template)
    setIsDialogOpen(true)
  }

  const handleCreate = () => {
    setSelectedTemplate(null)
    setIsDialogOpen(true)
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
        <div className="flex items-center gap-4 flex-1">
          <Input
            placeholder="Rechercher des prompts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
          <Select value={filterSport} onValueChange={setFilterSport}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrer par sport" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les sports</SelectItem>
              {sports.map((sport) => (
                <SelectItem key={sport.id} value={sport.id}>
                  {sport.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterMode} onValueChange={setFilterMode}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrer par mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les modes</SelectItem>
              <SelectItem value="express">Express</SelectItem>
              <SelectItem value="expert">Expert</SelectItem>
              <SelectItem value="creativity">Créativité</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleCreate}>Créer un modèle</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sport</TableHead>
            <TableHead 
              className="cursor-pointer" 
              onClick={() => {
                setSortField('mode')
                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
              }}
            >
              Mode {sortField === 'mode' && <ChevronsUpDown className="h-4 w-4 inline ml-1" />}
            </TableHead>
            <TableHead>Type de séance</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Validation</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="w-[200px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAndSortedTemplates.map((template) => (
            <TableRow 
              key={template.id}
              className={template.is_default ? "bg-red-50" : undefined}
            >
              <TableCell>{template.sports?.label || "Tous les sports"}</TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge 
                        variant="secondary" 
                        className="gap-2 capitalize"
                      >
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
                        <Badge 
                          variant="outline" 
                          className="gap-2 bg-red-50"
                        >
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
                    onClick={() => handleEdit(template)}
                    className="w-16"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTest(template)}
                    className="w-16"
                  >
                    <TestTube className="h-4 w-4 mr-1" />
                    Test
                  </Button>
                </div>
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
