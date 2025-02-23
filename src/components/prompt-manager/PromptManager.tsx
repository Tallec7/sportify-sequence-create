
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PromptTemplatesList } from "./PromptTemplatesList"
import { PromptHistory } from "./PromptHistory"
import { useSportsQuery } from "@/hooks/queries/useSportsQuery"
import { useAuthCheck } from "@/hooks/useAuthCheck"
import { supabase } from "@/integrations/supabase/client"

export const PromptManager = () => {
  const { toast } = useToast()
  useAuthCheck() // Ensure user is authenticated

  // Fetch sports for filtering
  const { data: sports = [] } = useSportsQuery()

  // Fetch prompt templates
  const { data: templates = [], isLoading } = useQuery({
    queryKey: ["prompt-templates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("prompt_templates")
        .select(`
          *,
          sports (
            label
          )
        `)
        .order("created_at", { ascending: false })

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load prompt templates"
        })
        throw error
      }

      return data
    }
  })

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Prompt Manager</CardTitle>
          <CardDescription>
            Manage and customize OpenAI prompts for session generation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="templates">
            <TabsList>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="templates">
              <PromptTemplatesList templates={templates} sports={sports} isLoading={isLoading} />
            </TabsContent>
            <TabsContent value="history">
              <PromptHistory />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

