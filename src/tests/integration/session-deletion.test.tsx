
import { describe, test, expect, beforeEach } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { SessionCard } from "@/components/sessions/SessionCard"
import { supabase } from "@/integrations/supabase/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const mockSession = {
  id: "123",
  title: "Session test",
  description: "Description test",
  sport: "Football",
  level: "Débutant",
  duration: 60,
  participants_min: 5,
  participants_max: 10,
  created_at: new Date().toISOString(),
}

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    </BrowserRouter>
  )
}

describe("Session Deletion Flow", () => {
  beforeEach(() => {
    vi.spyOn(supabase, "from").mockReturnValue({
      delete: vi.fn().mockResolvedValue({ data: null, error: null }),
      eq: vi.fn().mockReturnThis(),
    } as any)
  })

  test("should show confirmation dialog before deletion", async () => {
    renderWithProviders(
      <SessionCard
        session={mockSession}
        onDelete={() => {}}
      />
    )

    const deleteButton = screen.getByRole("button", { name: /supprimer/i })
    fireEvent.click(deleteButton)

    expect(screen.getByText(/êtes-vous sûr/i)).toBeInTheDocument()
    expect(
      screen.getByText(/cette action est irréversible/i)
    ).toBeInTheDocument()
  })

  test("should handle session deletion", async () => {
    const onDeleteMock = vi.fn()

    renderWithProviders(
      <SessionCard
        session={mockSession}
        onDelete={onDeleteMock}
      />
    )

    const deleteButton = screen.getByRole("button", { name: /supprimer/i })
    fireEvent.click(deleteButton)

    const confirmButton = screen.getByRole("button", { name: /supprimer/i })
    fireEvent.click(confirmButton)

    await waitFor(() => {
      expect(onDeleteMock).toHaveBeenCalledWith(mockSession.id)
    })
  })

  test("should cancel deletion when clicking cancel", async () => {
    const onDeleteMock = vi.fn()

    renderWithProviders(
      <SessionCard
        session={mockSession}
        onDelete={onDeleteMock}
      />
    )

    const deleteButton = screen.getByRole("button", { name: /supprimer/i })
    fireEvent.click(deleteButton)

    const cancelButton = screen.getByRole("button", { name: /annuler/i })
    fireEvent.click(cancelButton)

    expect(onDeleteMock).not.toHaveBeenCalled()
  })
})
