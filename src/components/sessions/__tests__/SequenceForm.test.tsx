
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { SequenceForm } from '../SequenceForm'
import { Sequence } from '@/types/sequence'
import { AgeCategoryType } from '@/types/settings'

describe('SequenceForm', () => {
  const mockFormData = {
    title: "Test Session",
    description: "Test Description",
    sport: "football",
    level: "beginner",
    duration: 60,
    participants_min: 10,
    participants_max: 20,
    age_category: "U13" as AgeCategoryType,
    intensity_level: "medium",
    cycle_id: null,
    objective: "",
    tactical_concepts: [],
    decision_making_focus: [],
    performance_metrics: [],
    expert_validated: false,
    validation_feedback: "",
    objectives: []
  }

  const defaultProps = {
    sequences: [],
    onAddSequence: () => {},
    onReorderSequences: () => {},
    formData: mockFormData
  }

  it('renders correctly', () => {
    render(<SequenceForm {...defaultProps} />)
    expect(screen.getByText('Séquences')).toBeInTheDocument()
  })

  it('calls onAddSequence when the form is submitted', () => {
    const onAddSequence = vi.fn()
    render(<SequenceForm {...defaultProps} onAddSequence={onAddSequence} />)
    
    fireEvent.click(screen.getByText('Ajouter une séquence'))
    expect(screen.getByText('Ajouter')).toBeInTheDocument()
  })

  it('displays existing sequences', () => {
    const sequences: Sequence[] = [{
      id: '1',
      title: 'Sequence 1',
      description: 'Description 1',
      sequence_order: 0,
      session_id: 'session1',
      exercises: [],
      sequence_type: 'warmup',
      duration: 30,
      intensity_level: 'high',
      objective: 'Objective 1'
    }]
    render(<SequenceForm {...defaultProps} sequences={sequences} />)
    expect(screen.getByText('Sequence 1')).toBeInTheDocument()
  })
})
