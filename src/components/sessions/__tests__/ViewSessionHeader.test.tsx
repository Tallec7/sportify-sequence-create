
import { render, screen, fireEvent } from "@testing-library/react"
import { ViewSessionHeader } from "../ViewSessionHeader"
import { vi, describe, it, expect, beforeEach } from 'vitest'

describe("ViewSessionHeader", () => {
  const mockFormData = {
    title: "Test Session",
    sport: "Football",
    level: "Débutant",
    duration: 60,
    description: "Test description",
    participants_min: 1,
    participants_max: 10,
    age_category: "adult",
    intensity_level: "medium"
  }

  const mockOnDelete = vi.fn()
  const mockOnEdit = vi.fn()

  beforeEach(() => {
    render(
      <ViewSessionHeader
        formData={mockFormData}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )
  })

  it("renders the session title", () => {
    expect(screen.getByText("Test Session")).toBeInTheDocument()
  })

  it("displays sport badge", () => {
    expect(screen.getByText("Football")).toBeInTheDocument()
  })

  it("displays level badge", () => {
    expect(screen.getByText("Débutant")).toBeInTheDocument()
  })

  it("displays duration badge", () => {
    expect(screen.getByText("1h")).toBeInTheDocument()
  })

  it("calls onEdit when edit button is clicked", () => {
    fireEvent.click(screen.getByText("Modifier"))
    expect(mockOnEdit).toHaveBeenCalledTimes(1)
  })

  it("shows delete confirmation dialog when delete button is clicked", () => {
    fireEvent.click(screen.getByText("Supprimer"))
    expect(
      screen.getByText("Cette action est irréversible.")
    ).toBeInTheDocument()
  })

  it("calls onDelete when confirmation is accepted", () => {
    fireEvent.click(screen.getByText("Supprimer"))
    fireEvent.click(screen.getByRole("button", { name: "Supprimer" }))
    expect(mockOnDelete).toHaveBeenCalledTimes(1)
  })

  it("does not call onDelete when confirmation is cancelled", () => {
    fireEvent.click(screen.getByText("Supprimer"))
    fireEvent.click(screen.getByRole("button", { name: "Annuler" }))
    expect(mockOnDelete).not.toHaveBeenCalled()
  })
})
