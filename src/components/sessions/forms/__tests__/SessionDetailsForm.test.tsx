
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { SessionDetailsForm } from '../SessionDetailsForm'
import type { SessionFormData } from '@/types/settings'

describe('SessionDetailsForm', () => {
  const mockHandleSelectChange = vi.fn()
  const mockHandleNumberChange = vi.fn()
  
  const defaultFormData: SessionFormData = {
    title: 'Test Session',
    description: 'Test Description',
    sport: 'football',
    level: 'debutant',
    duration: 60,
    participants_min: 1,
    participants_max: 10,
    age_category: "U13",
    intensity_level: 'medium',
    cycle_id: null,
    objective: "Test objective",
    tactical_concepts: [],
    decision_making_focus: [],
    performance_metrics: [],
    expert_validated: false,
    validation_feedback: "",
    objectives: []
  }

  it('renders without crashing', () => {
    render(
      <SessionDetailsForm
        formData={defaultFormData}
        handleSelectChange={mockHandleSelectChange}
        handleNumberChange={mockHandleNumberChange}
      />
    )
    expect(screen.getByText('Niveau')).toBeInTheDocument()
  })

  it('calls handleSelectChange when level changes', () => {
    render(
      <SessionDetailsForm
        formData={defaultFormData}
        handleSelectChange={mockHandleSelectChange}
        handleNumberChange={mockHandleNumberChange}
      />
    )

    const levelSelect = screen.getByText('Sélectionnez un niveau')
    fireEvent.click(levelSelect)
    
    const intermediateOption = screen.getByText('Intermédiaire')
    fireEvent.click(intermediateOption)

    expect(mockHandleSelectChange).toHaveBeenCalledWith('level', 'intermediaire')
  })
})
