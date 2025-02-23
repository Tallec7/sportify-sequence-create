
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useSettingsHistoryQuery } from "@/hooks/queries/useSettingsHistoryQuery"
import { format } from "date-fns"

interface SettingsHistoryProps {
  tableName?: string
}

export const SettingsHistory = ({ tableName }: SettingsHistoryProps) => {
  const { data: history = [], isLoading } = useSettingsHistoryQuery(tableName)

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Table</TableHead>
            <TableHead>Changes</TableHead>
            <TableHead>Modified At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {entry.table_name.replace(/_/g, " ")}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  {Object.keys(entry.new_values).map((key) => {
                    const oldValue = entry.old_values[key]
                    const newValue = entry.new_values[key]
                    if (oldValue !== newValue) {
                      return (
                        <div key={key} className="text-sm">
                          <span className="font-medium">{key}:</span>{" "}
                          <span className="text-muted-foreground line-through">
                            {oldValue}
                          </span>{" "}
                          → <span className="text-green-600">{newValue}</span>
                        </div>
                      )
                    }
                    return null
                  })}
                </div>
              </TableCell>
              <TableCell>
                {format(new Date(entry.modified_at), "PPp")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
