
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { SessionForm } from '../SessionForm'

describe('SessionForm', () => {
  const mockOnSave = vi.fn()
  const mockSetFormData = vi.fn()
  const defaultFormData = {
    title: 'Test Session',
    description: 'Test Description',
    sport: 'football',
    level: 'debutant',
    duration: 60,
    participants_min: 1,
    participants_max: 10,
    age_category: 'U13',
    intensity_level: 'medium',
    cycle_id: null
  }

  it('renders without crashing', () => {
    render(
      <SessionForm
        onSave={mockOnSave}
        formData={defaultFormData}
        setFormData={mockSetFormData}
      />
    )
    expect(screen.getByText('Nouvelle séance')).toBeInTheDocument()
  })

  it('updates form data when inputs change', () => {
    render(
      <SessionForm
        onSave={mockOnSave}
        formData={defaultFormData}
        setFormData={mockSetFormData}
      />
    )

    const titleInput = screen.getByLabelText('Titre')
    fireEvent.change(titleInput, { target: { value: 'Updated Title' } })

    expect(mockSetFormData).toHaveBeenCalled()
  })

  it('calls onSave when save button is clicked', () => {
    render(
      <SessionForm
        onSave={mockOnSave}
        formData={defaultFormData}
        setFormData={mockSetFormData}
      />
    )

    const saveButton = screen.getByText('Sauvegarder')
    fireEvent.click(saveButton)

    expect(mockOnSave).toHaveBeenCalled()
  })
})
