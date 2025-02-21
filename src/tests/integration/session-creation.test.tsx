
import { describe, test, expect, beforeEach } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import Editor from "@/pages/Editor"
import { supabase } from "@/integrations/supabase/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

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

describe("Session Creation Flow", () => {
  beforeEach(() => {
    vi.spyOn(supabase, "from").mockReturnValue({
      insert: vi.fn().mockResolvedValue({ data: null, error: null }),
      select: vi.fn().mockResolvedValue({ data: null, error: null }),
    } as any)
  })

  test("should allow creating a new session with basic information", async () => {
    renderWithProviders(<Editor />)

    // Remplir le formulaire de base
    fireEvent.change(screen.getByLabelText(/titre/i), {
      target: { value: "Session de test" },
    })
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Description de la session de test" },
    })
    fireEvent.change(screen.getByLabelText(/sport/i), {
      target: { value: "Football" },
    })
    fireEvent.change(screen.getByLabelText(/niveau/i), {
      target: { value: "Débutant" },
    })

    // Sauvegarder la session
    const saveButton = screen.getByRole("button", { name: /enregistrer/i })
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(supabase.from).toHaveBeenCalledWith("sessions")
    })
  })

  test("should handle session creation errors", async () => {
    vi.spyOn(supabase, "from").mockReturnValue({
      insert: vi.fn().mockResolvedValue({
        data: null,
        error: new Error("Failed to create session"),
      }),
      select: vi.fn().mockResolvedValue({ data: null, error: null }),
    } as any)

    renderWithProviders(<Editor />)

    fireEvent.change(screen.getByLabelText(/titre/i), {
      target: { value: "Session avec erreur" },
    })

    const saveButton = screen.getByRole("button", { name: /enregistrer/i })
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(screen.getByText(/erreur/i)).toBeInTheDocument()
    })
  })
})
