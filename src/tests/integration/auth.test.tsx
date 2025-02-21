
import { describe, test, expect, beforeEach, vi } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import Auth from "@/pages/Auth"
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

describe("Authentication Flow", () => {
  beforeEach(() => {
    // Reset supabase auth state before each test
    vi.spyOn(supabase.auth, "signInWithPassword").mockResolvedValue({
      data: { user: null, session: null },
      error: null,
    })
    vi.spyOn(supabase.auth, "signUp").mockResolvedValue({
      data: { user: null, session: null },
      error: null,
    })
  })

  test("should display login form by default", () => {
    renderWithProviders(<Auth />)
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/mot de passe/i)).toBeInTheDocument()
  })

  test("should handle login submission", async () => {
    renderWithProviders(<Auth />)
    const emailInput = screen.getByPlaceholderText(/email/i)
    const passwordInput = screen.getByPlaceholderText(/mot de passe/i)
    const submitButton = screen.getByRole("button", { name: /connexion/i })

    fireEvent.change(emailInput, { target: { value: "test@example.com" } })
    fireEvent.change(passwordInput, { target: { value: "password123" } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      })
    })
  })

  test("should handle signup submission", async () => {
    renderWithProviders(<Auth />)
    const signupButton = screen.getByRole("button", { name: /s'inscrire/i })
    fireEvent.click(signupButton)

    const emailInput = screen.getByPlaceholderText(/email/i)
    const passwordInput = screen.getByPlaceholderText(/mot de passe/i)
    const submitButton = screen.getByRole("button", { name: /créer un compte/i })

    fireEvent.change(emailInput, { target: { value: "newuser@example.com" } })
    fireEvent.change(passwordInput, { target: { value: "newpassword123" } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(supabase.auth.signUp).toHaveBeenCalledWith({
        email: "newuser@example.com",
        password: "newpassword123",
      })
    })
  })
})
