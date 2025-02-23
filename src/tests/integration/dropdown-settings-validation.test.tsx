
import { describe, test, expect, beforeEach, vi } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionForm } from "@/components/sessions/SessionForm"
import { AddSequenceForm } from "@/components/sessions/AddSequenceForm" 
import { ExerciseForm } from "@/components/sessions/ExerciseForm"
import { supabase } from "@/integrations/supabase/client"
import type { AgeCategoryType } from "@/types/settings"

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

describe("Dynamic Values Validation", () => {
  beforeEach(() => {
    vi.spyOn(supabase, "from").mockReturnValue({
      select: vi.fn().mockResolvedValue({ 
        data: [
          { id: "1", value: "medium", label: "Moyen" },
          { id: "2", value: "warmup", label: "Échauffement" },
          { id: "3", value: "exercise", label: "Exercice" }
        ], 
        error: null 
      }),
    } as any)
  })

  test("Session form only uses dynamic values from dropdown settings", async () => {
    const formData = {
      title: "",
      description: "",
      sport: "",
      level: "",
      duration: 60,
      participants_min: 1,
      participants_max: 10,
      age_category: "U13" as AgeCategoryType,
      intensity_level: "medium",
      cycle_id: null
    }

    renderWithProviders(
      <SessionForm
        formData={formData}
        setFormData={() => {}}
        onSave={() => {}}
      />
    )

    await waitFor(() => {
      expect(screen.getByLabelText(/intensité/i)).toBeInTheDocument()
    })

    // Vérifie que nous récupérons bien les valeurs depuis l'API
    expect(supabase.from).toHaveBeenCalledWith("intensity_levels")
  })
  
  test("Sequence form uses dynamic sequence types", async () => {
    const newSequence = {
      title: "",
      description: "",
      duration: 0,
      sequence_type: "warmup",
      intensity_level: "medium",
      sequence_order: 1  // Add required field
    }

    renderWithProviders(
      <AddSequenceForm
        newSequence={newSequence}
        setNewSequence={() => {}}
        onSubmit={async () => {}}
      />
    )

    await waitFor(() => {
      expect(screen.getByText(/type de séquence/i)).toBeInTheDocument()
    })

    expect(supabase.from).toHaveBeenCalledWith("sequence_types")
  })

  test("Exercise form uses dynamic activity types", async () => {
    renderWithProviders(
      <ExerciseForm sequenceId="test-id" />
    )

    await waitFor(() => {
      expect(screen.getByText(/type d'activité/i)).toBeInTheDocument()
    })

    expect(supabase.from).toHaveBeenCalledWith("activity_types")
  })
})
