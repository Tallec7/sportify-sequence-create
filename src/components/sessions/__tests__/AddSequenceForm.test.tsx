
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { AddSequenceForm } from '../AddSequenceForm'

describe('AddSequenceForm', () => {
  const mockSequence = {
    id: '1',
    title: "Test Sequence",
    description: "Test Description",
    duration: 60,
    sequence_type: "main" as const,
    intensity_level: "medium",
    sequence_order: 1,
    session_id: 'session-1',
    exercises: [],
    objective: "Test objective"
  }

  const defaultProps = {
    newSequence: mockSequence,
    setNewSequence: () => {},
    onSubmit: async () => {},
    onCancel: () => {},
    sequences: []
  }

  it('renders correctly', () => {
    render(<AddSequenceForm {...defaultProps} />)
    expect(screen.getByText('Ajouter la séquence')).toBeInTheDocument()
  })

  it('displays the form', () => {
    render(<AddSequenceForm {...defaultProps} />)
    expect(screen.getByLabelText('Titre')).toBeInTheDocument()
  })
})
