
import { useQuery } from "@tanstack/react-query"
import { useToast } from "@/components/ui/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { supabase } from "@/integrations/supabase/client"
import { Skeleton } from "@/components/ui/skeleton"

export const PromptHistory = () => {
  const { toast } = useToast()

  const { data: history = [], isLoading } = useQuery({
    queryKey: ["prompt-history"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("prompt_history")
        .select(`
          *,
          prompt_templates (
            training_type,
            sports (
              label
            )
          )
        `)
        .order("created_at", { ascending: false })

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load prompt history"
        })
        throw error
      }

      return data
    }
  })

  const handleRestore = async (templateId: string, promptText: string) => {
    try {
      const { error } = await supabase
        .from("prompt_templates")
        .update({ prompt_text: promptText })
        .eq("id", templateId)

      if (error) throw error

      toast({
        title: "Success",
        description: "Prompt template restored successfully"
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to restore prompt template"
      })
    }
  }

  if (isLoading) {
    return <Skeleton className="h-48 w-full" />
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Sport</TableHead>
          <TableHead>Training Type</TableHead>
          <TableHead>Prompt Text</TableHead>
          <TableHead className="w-24">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {history.map((entry) => (
          <TableRow key={entry.id}>
            <TableCell>
              {format(new Date(entry.created_at!), "PPp")}
            </TableCell>
            <TableCell>
              {entry.prompt_templates?.sports?.label || "All Sports"}
            </TableCell>
            <TableCell>{entry.prompt_templates?.training_type}</TableCell>
            <TableCell className="max-w-md truncate">
              {entry.prompt_text}
            </TableCell>
            <TableCell>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleRestore(entry.template_id!, entry.prompt_text)}
              >
                Restore
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

