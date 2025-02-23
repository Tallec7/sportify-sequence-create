
import { describe, test, expect, beforeEach, vi } from "vitest"
import { render, screen, waitFor, fireEvent } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionObjectivesForm } from "@/components/sessions/forms/SessionObjectivesForm"
import { ExerciseObjectivesList } from "@/components/sessions/ExerciseObjectivesList"
import { supabase } from "@/integrations/supabase/client"
import { Database } from "@/integrations/supabase/types"

type ObjectiveType = Database["public"]["Enums"]["objective_type_enum"]

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

describe("Objectives Management", () => {
  beforeEach(() => {
    vi.spyOn(supabase, "from").mockReturnValue({
      insert: vi.fn().mockResolvedValue({ 
        data: [{ 
          id: "1", 
          description: "Test objective",
          type: "technique",
          is_priority: true,
          order_index: 0,
          objective_type: "apprentissage" as ObjectiveType,
          session_id: "test-session"
        }], 
        error: null 
      }),
      select: vi.fn().mockResolvedValue({ 
        data: [], 
        error: null 
      }),
    } as any)
  })

  test("Session objectives can be added and displayed", async () => {
    const mockObjectives = [{
      id: "1",
      description: "Test objective",
      type: "technique",
      is_priority: true,
      order_index: 0,
      objective_type: "apprentissage" as ObjectiveType,
      session_id: "test-session"
    }]

    renderWithProviders(
      <SessionObjectivesForm
        objectives={mockObjectives}
        sessionId="test-session"
      />
    )

    await waitFor(() => {
      expect(screen.getByText("Test objective")).toBeInTheDocument()
    })

    expect(screen.getByText("Prioritaire")).toBeInTheDocument()
    expect(screen.getByText("technique")).toBeInTheDocument()
    expect(screen.getByText("Apprentissage")).toBeInTheDocument()
  })

  test("Sequence objectives are displayed correctly", async () => {
    const mockObjectives = [{
      id: "1",
      description: "Test sequence objective",
      objective_type: "apprentissage" as ObjectiveType,
      is_priority: true,
      order_index: 0,
      sequence_id: "test-sequence"
    }]

    renderWithProviders(
      <ExerciseObjectivesList objectives={mockObjectives} />
    )

    await waitFor(() => {
      expect(screen.getByText("Test sequence objective")).toBeInTheDocument()
    })
  })
})
