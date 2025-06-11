
import { render, screen, fireEvent } from "@testing-library/react"
import { SessionBasicInfoForm } from "../SessionBasicInfoForm"
import { vi, describe, it, expect, beforeEach } from 'vitest'
import type { SessionFormData } from "@/types/settings"

vi.mock("@/hooks/queries/useSportsQuery", () => ({
  useSportsQuery: () => ({
    data: [
      { id: "1", value: "football", label: "Football" },
      { id: "2", value: "basketball", label: "Basketball" }
    ]
  })
}))

describe("SessionBasicInfoForm", () => {
  const mockFormData: SessionFormData = {
    title: "Test Session",
    description: "Test Description",
    sport: "football",
    level: "beginner",
    duration: 60,
    participants_min: 1,
    participants_max: 10,
    age_category: "U13",
    intensity_level: "medium",
    cycle_id: null,
    objective: "Test objective",
    tactical_concepts: [],
    decision_making_focus: [],
    performance_metrics: [],
    expert_validated: false,
    validation_feedback: "",
    objectives: []
  }

  const mockHandlers = {
    handleChange: vi.fn(),
    handleSelectChange: vi.fn(),
    handleNumberChange: vi.fn()
  }

  it('affiche les champs avec les valeurs correctes', () => {
    render(
      <SessionBasicInfoForm
        formData={mockFormData}
        {...mockHandlers}
      />
    )

    expect(screen.getByLabelText(/titre/i)).toHaveValue(mockFormData.title)
    expect(screen.getByLabelText(/description/i)).toHaveValue(mockFormData.description)
  })

  it('appelle handleChange lors de la modification du titre', () => {
    render(
      <SessionBasicInfoForm
        formData={mockFormData}
        {...mockHandlers}
      />
    )

    fireEvent.change(screen.getByLabelText(/titre/i), {
      target: { value: 'Nouveau titre' }
    })

    expect(mockHandlers.handleChange).toHaveBeenCalled()
  })

  it('appelle handleChange lors de la modification de la description', () => {
    render(
      <SessionBasicInfoForm
        formData={mockFormData}
        {...mockHandlers}
      />
    )

    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'Nouvelle description' }
    })

    expect(mockHandlers.handleChange).toHaveBeenCalled()
  })
})
