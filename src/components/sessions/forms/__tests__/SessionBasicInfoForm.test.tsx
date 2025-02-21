
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { SessionBasicInfoForm } from '../SessionBasicInfoForm'

describe('SessionBasicInfoForm Component', () => {
  const mockFormData = {
    title: "Test Session",
    description: "Test description",
    sport: "football",
    level: "debutant",
    duration: 60,
    participants_min: 5,
    participants_max: 10,
    age_category: "U13",
    intensity_level: "medium",
    cycle_id: null
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
