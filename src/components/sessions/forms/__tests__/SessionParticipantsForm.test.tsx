
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { SessionParticipantsForm } from '../SessionParticipantsForm'
import type { SessionFormData } from '@/hooks/mutations/useSessionMutation'

describe('SessionParticipantsForm Component', () => {
  const mockFormData: SessionFormData = {
    title: "Test Session",
    description: "Test description",
    sport: "football",
    level: "debutant",
    duration: 60,
    participants_min: 5,
    participants_max: 10,
    age_category: "U13",
    intensity_level: "medium",
    cycle_id: null,
    objective: "Test objective"
  }

  const mockHandleNumberChange = vi.fn()

  it('affiche les champs avec les valeurs correctes', () => {
    render(
      <SessionParticipantsForm
        formData={mockFormData}
        handleNumberChange={mockHandleNumberChange}
      />
    )

    expect(screen.getByLabelText(/nombre minimum/i)).toHaveValue(mockFormData.participants_min)
    expect(screen.getByLabelText(/nombre maximum/i)).toHaveValue(mockFormData.participants_max)
  })

  it('appelle handleNumberChange lors de la modification du nombre minimum', () => {
    render(
      <SessionParticipantsForm
        formData={mockFormData}
        handleNumberChange={mockHandleNumberChange}
      />
    )

    fireEvent.change(screen.getByLabelText(/nombre minimum/i), {
      target: { value: '3' }
    })

    expect(mockHandleNumberChange).toHaveBeenCalled()
  })

  it('appelle handleNumberChange lors de la modification du nombre maximum', () => {
    render(
      <SessionParticipantsForm
        formData={mockFormData}
        handleNumberChange={mockHandleNumberChange}
      />
    )

    fireEvent.change(screen.getByLabelText(/nombre maximum/i), {
      target: { value: '15' }
    })

    expect(mockHandleNumberChange).toHaveBeenCalled()
  })

  it('requiert des valeurs numériques pour les champs de participants', () => {
    render(
      <SessionParticipantsForm
        formData={mockFormData}
        handleNumberChange={mockHandleNumberChange}
      />
    )

    const minInput = screen.getByLabelText(/nombre minimum/i)
    const maxInput = screen.getByLabelText(/nombre maximum/i)

    expect(minInput).toHaveAttribute('type', 'number')
    expect(maxInput).toHaveAttribute('type', 'number')
  })
})
