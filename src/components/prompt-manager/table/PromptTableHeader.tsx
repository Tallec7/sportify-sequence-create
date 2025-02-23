
import { TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronsUpDown } from "lucide-react"
import type { SortField, SortOrder } from "../types"

interface PromptTableHeaderProps {
  sortField: SortField
  sortOrder: SortOrder
  onSort: (field: SortField) => void
}

export const PromptTableHeader = ({ sortField, sortOrder, onSort }: PromptTableHeaderProps) => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Sport</TableHead>
        <TableHead 
          className="cursor-pointer" 
          onClick={() => onSort('mode')}
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
  )
}

