
import { describe, test, expect, beforeEach, vi } from "vitest"
import { render, screen, waitFor, fireEvent } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import PromptManagerPage from "@/pages/PromptManager"
import { supabase } from "@/integrations/supabase/client"

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

describe("Prompt Manager Interface", () => {
  beforeEach(() => {
    vi.spyOn(supabase, "from").mockReturnValue({
      select: vi.fn().mockResolvedValue({
        data: [
          {
            id: "1",
            prompt_text: "Test prompt",
            training_type: "exercice",
            is_validated: true,
            is_active: true,
            created_at: new Date().toISOString()
          }
        ],
        error: null
      }),
      insert: vi.fn().mockResolvedValue({ data: null, error: null }),
      update: vi.fn().mockResolvedValue({ data: null, error: null })
    } as any)
  })

  test("Displays prompt templates list", async () => {
    renderWithProviders(<PromptManagerPage />)

    await waitFor(() => {
      expect(screen.getByText("Test prompt")).toBeInTheDocument()
    })

    expect(screen.getByText("exercice")).toBeInTheDocument()
    expect(screen.getByRole("switch")).toBeInTheDocument() // Toggle d'activation
  })

  test("Can add new prompt template", async () => {
    renderWithProviders(<PromptManagerPage />)

    // Simuler l'ajout d'un nouveau template
    const addButton = screen.getByRole("button", { name: /Ajouter/i })
    fireEvent.click(addButton)

    const promptInput = screen.getByLabelText(/Prompt/i)
    fireEvent.change(promptInput, { target: { value: "New test prompt" } })

    const submitButton = screen.getByRole("button", { name: /Sauvegarder/i })
    fireEvent.click(submitButton)

    expect(supabase.from).toHaveBeenCalledWith("prompt_templates")
  })

  test("Can toggle prompt template activation", async () => {
    renderWithProviders(<PromptManagerPage />)

    await waitFor(() => {
      const toggleButton = screen.getByRole("switch")
      fireEvent.click(toggleButton)
    })

    expect(supabase.from).toHaveBeenCalledWith("prompt_templates")
  })
})
