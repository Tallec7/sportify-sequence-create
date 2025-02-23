import { describe, test, expect, beforeEach, vi } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import Editor from "@/pages/Editor"
import { supabase } from "@/integrations/supabase/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { AgeCategoryType } from "@/types/settings"

const mockFormData = {
  title: "Test Session",
  description: "Test Description",
  sport: "football",
  level: "debutant",
  duration: 60,
  participants_min: 1,
  participants_max: 10,
  age_category: "U13" as AgeCategoryType,
  intensity_level: "medium",
  cycle_id: null,
  objective: "Test objective"
}

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

describe("Dropdown Settings Validation", () => {
  beforeEach(() => {
    vi.spyOn(supabase, "from").mockReturnValue({
      insert: vi.fn().mockResolvedValue({ data: null, error: null }),
      select: vi.fn().mockResolvedValue({ data: [mockFormData], error: null }),
      update: vi.fn().mockResolvedValue({ data: null, error: null }),
    } as any)
  })

  test("should validate dropdown settings correctly", async () => {
    renderWithProviders(<Editor />)

    // Ouvrir le formulaire des paramètres
    fireEvent.click(screen.getByText(/paramètres/i))

    // Modifier les paramètres des dropdowns
    fireEvent.change(screen.getByLabelText(/titre/i), {
      target: { value: "Nouveau titre" },
    })

    // Enregistrer les modifications
    const saveButton = screen.getByRole("button", { name: /enregistrer/i })
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(supabase.from).toHaveBeenCalledWith("sessions")
    })
  })
})
