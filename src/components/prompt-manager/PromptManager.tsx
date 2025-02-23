
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PromptTemplatesList } from "./PromptTemplatesList"
import { PromptHistory } from "./PromptHistory"
import { useSportsQuery } from "@/hooks/queries/useSportsQuery"
import { useAuthCheck } from "@/hooks/useAuthCheck"
import { usePromptTemplatesQuery } from "@/hooks/queries/usePromptTemplatesQuery"
import { PromptManagerLoading } from "./PromptManagerLoading"
import { supabase } from "@/integrations/supabase/client"

export const PromptManager = () => {
  const { userId } = useAuthCheck() // Ensure user is authenticated

  // Fetch sports for filtering
  const { data: sports = [] } = useSportsQuery()

  // Fetch prompt templates
  const { data: templates = [], isLoading } = usePromptTemplatesQuery()

  if (isLoading) {
    return <PromptManagerLoading />
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Gestionnaire de prompts</CardTitle>
          <CardDescription>
            Gérez et personnalisez les prompts OpenAI pour la génération de séances
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="templates">
            <TabsList>
              <TabsTrigger value="templates">Modèles</TabsTrigger>
              <TabsTrigger value="history">Historique</TabsTrigger>
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

