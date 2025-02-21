
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { SessionDetailsForm } from '../SessionDetailsForm'

describe('SessionDetailsForm Component', () => {
  const mockFormData = {
    title: "Test Session",
    description: "Test description",
    sport: "football",
    level: "debutant",
    duration: 60,
    participants_min: 5,
    participants_max: 10,
    age_category: "U13",
    intensity_level: "medium"
  }

  const mockHandlers = {
    handleSelectChange: vi.fn(),
    handleNumberChange: vi.fn()
  }

  it('affiche les champs avec les valeurs correctes', () => {
    render(
      <SessionDetailsForm
        formData={mockFormData}
        {...mockHandlers}
      />
    )

    expect(screen.getByLabelText(/durée/i)).toHaveValue(mockFormData.duration)
  })

  it('appelle handleNumberChange lors de la modification de la durée', () => {
    render(
      <SessionDetailsForm
        formData={mockFormData}
        {...mockHandlers}
      />
    )

    fireEvent.change(screen.getByLabelText(/durée/i), {
      target: { value: '90' }
    })

    expect(mockHandlers.handleNumberChange).toHaveBeenCalled()
  })

  it('affiche tous les champs de sélection', () => {
    render(
      <SessionDetailsForm
        formData={mockFormData}
        {...mockHandlers}
      />
    )

    expect(screen.getByLabelText(/niveau/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/catégorie d'âge/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/intensité/i)).toBeInTheDocument()
  })
})
