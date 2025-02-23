
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const PromptManagerLoading = () => {
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
              <Skeleton className="h-48 w-full" />
            </TabsContent>
            <TabsContent value="history">
              <Skeleton className="h-48 w-full" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
