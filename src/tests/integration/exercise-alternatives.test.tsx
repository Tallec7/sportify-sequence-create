
import { describe, test, expect, beforeEach, vi } from "vitest"
import { render, screen, waitFor, fireEvent } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ExerciseAlternatives } from "@/components/sessions/ExerciseAlternatives"
import { Exercise } from "@/types/sequence"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    </BrowserRouter>
  )
}

describe("Exercise Alternatives Generation", () => {
  const mockExercise: Exercise = {
    id: "1",
    title: "Original exercise",
    description: "Test description",
    duration: 10,
    intensity_level: "medium",
    exercise_order: 1,
    activity_type: "exercise",
    objective: "Test objective"
  }

  const mockSessionContext = {
    sport: "handball",
    level: "débutant",
    age_category: "U13",
    intensity_level: "medium"
  }

  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        alternatives: [
          {
            title: "Alternative exercise",
            description: "Alternative description",
            duration: 15,
            intensity_level: "medium",
            activity_type: "exercise",
            objective: "Alternative objective"
          }
        ]
      })
    })
  })

  test("Generates and displays alternative exercises", async () => {
    const handleSelectAlternative = vi.fn()

    renderWithProviders(
      <ExerciseAlternatives
        exercise={mockExercise}
        sessionContext={mockSessionContext}
        onSelectAlternative={handleSelectAlternative}
      />
    )

    const generateButton = screen.getByText(/Générer des alternatives/i)
    expect(generateButton).toBeInTheDocument()

    fireEvent.click(generateButton)

    await waitFor(() => {
      expect(screen.getByText("Alternative exercise")).toBeInTheDocument()
    })

    expect(screen.getByText("Alternative description")).toBeInTheDocument()
  })

  test("Alternative selection triggers callback", async () => {
    const handleSelectAlternative = vi.fn()

    renderWithProviders(
      <ExerciseAlternatives
        exercise={mockExercise}
        sessionContext={mockSessionContext}
        onSelectAlternative={handleSelectAlternative}
      />
    )

    fireEvent.click(screen.getByText(/Générer des alternatives/i))

    await waitFor(() => {
      expect(screen.getByText("Alternative exercise")).toBeInTheDocument()
    })

    const selectButton = screen.getByRole("button", { name: "" }) // Le bouton avec l'icône Check
    fireEvent.click(selectButton)

    expect(handleSelectAlternative).toHaveBeenCalledWith(expect.objectContaining({
      title: "Alternative exercise",
      description: "Alternative description"
    }))
  })
})
