
import { render, screen, fireEvent } from "@testing-library/react"
import { AddSequenceForm } from "../AddSequenceForm"
import { vi, describe, it, expect, beforeEach } from 'vitest'

describe("AddSequenceForm", () => {
  const mockNewSequence = {
    title: "",
    description: "",
    duration: 0,
    sequence_type: "main" as const,
    intensity_level: "medium",
    sequence_order: 1,
  }

  const mockSetNewSequence = vi.fn()
  const mockOnSubmit = vi.fn()

  beforeEach(() => {
    render(
      <AddSequenceForm
        newSequence={mockNewSequence}
        setNewSequence={mockSetNewSequence}
        onSubmit={mockOnSubmit}
      />
    )
  })

  it("renders all form fields", () => {
    expect(screen.getByLabelText(/titre/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/type de séquence/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/durée/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/niveau d'intensité/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
  })

  it("updates title when input changes", () => {
    const titleInput = screen.getByLabelText(/titre/i)
    fireEvent.change(titleInput, { target: { value: "New Title" } })
    expect(mockSetNewSequence).toHaveBeenCalledWith({
      ...mockNewSequence,
      title: "New Title",
    })
  })

  it("updates duration when input changes", () => {
    const durationInput = screen.getByLabelText(/durée/i)
    fireEvent.change(durationInput, { target: { value: "30" } })
    expect(mockSetNewSequence).toHaveBeenCalledWith({
      ...mockNewSequence,
      duration: 30,
    })
  })

  it("updates description when textarea changes", () => {
    const descriptionInput = screen.getByLabelText(/description/i)
    fireEvent.change(descriptionInput, {
      target: { value: "New description" },
    })
    expect(mockSetNewSequence).toHaveBeenCalledWith({
      ...mockNewSequence,
      description: "New description",
    })
  })

  it("calls onSubmit when form is submitted", async () => {
    const form = screen.getByRole("form")
    fireEvent.submit(form)
    expect(mockOnSubmit).toHaveBeenCalled()
  })

  it("requires title field", () => {
    const titleInput = screen.getByLabelText(/titre/i)
    expect(titleInput).toBeRequired()
  })

  it("requires duration field", () => {
    const durationInput = screen.getByLabelText(/durée/i)
    expect(durationInput).toBeRequired()
  })

  it("requires sequence type field", () => {
    const sequenceTypeInput = screen.getByLabelText(/type de séquence/i)
    expect(sequenceTypeInput).toBeRequired()
  })
})
