
import { useState } from "react"
import { Exercise } from "@/types/sequence"
import { useExerciseAlternativesMutation } from "@/hooks/mutations/useExerciseAlternativesMutation"
import { Button } from "@/components/ui/button"
import { Sparkles, RefreshCw, Check, X } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

interface ExerciseAlternativesProps {
  exercise: Exercise
  sessionContext: {
    sport: string
    level: string
    age_category: string
    intensity_level: string
  }
  onSelectAlternative: (alternative: Exercise) => void
}

export const ExerciseAlternatives = ({
  exercise,
  sessionContext,
  onSelectAlternative,
}: ExerciseAlternativesProps) => {
  const [alternatives, setAlternatives] = useState<Exercise[]>([])
  const alternativesMutation = useExerciseAlternativesMutation()
  const { toast } = useToast()

  const handleGenerateAlternatives = async () => {
    // Validate session context before making the request
    if (!sessionContext?.sport || !sessionContext?.level) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Le sport et le niveau sont requis pour générer des alternatives",
      })
      return
    }

    const result = await alternativesMutation.mutateAsync({
      exercise,
      sessionContext,
    })
    setAlternatives(result.alternatives)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Alternatives</h3>
        <Button
          onClick={handleGenerateAlternatives}
          disabled={alternativesMutation.isPending}
          variant="outline"
          className="gap-2"
        >
          {alternativesMutation.isPending ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          Générer des alternatives
        </Button>
      </div>

      {alternativesMutation.isPending ? (
        <div className="space-y-4">
          <Card className="animate-pulse">
            <CardHeader className="h-20 bg-muted" />
            <CardContent className="h-32 bg-muted mt-4" />
          </Card>
        </div>
      ) : (
        <div className="grid gap-4">
          {alternatives.map((alternative, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{alternative.title}</CardTitle>
                <CardDescription>
                  Durée: {alternative.duration} min | Intensité: {alternative.intensity_level}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{alternative.description}</p>
                {alternative.variations && alternative.variations.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Variations:</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {alternative.variations.map((variation, i) => (
                        <li key={i}>{variation}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleGenerateAlternatives()}
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button
                  variant="default"
                  size="icon"
                  onClick={() => onSelectAlternative(alternative)}
                >
                  <Check className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
