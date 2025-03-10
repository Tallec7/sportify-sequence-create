
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ViewSessionSequences } from '../ViewSessionSequences'
import type { Sequence } from '@/types/sequence'

describe('ViewSessionSequences Component', () => {
  const mockSequences: Sequence[] = [
    {
      id: '1',
      title: 'Échauffement',
      description: 'Séquence d\'échauffement',
      duration: 15,
      sequence_type: 'warmup',
      intensity_level: 'low',
      sequence_order: 1,
      session_id: 'session1',
      exercises: [],
      objective: "Échauffement général"
    },
    {
      id: '2',
      title: 'Exercice principal',
      description: 'Séquence principale',
      duration: 30,
      sequence_type: 'main',
      intensity_level: 'high',
      sequence_order: 2,
      session_id: 'session1',
      exercises: [],
      objective: "Développement technique"
    }
  ]

  it('affiche la liste des séquences', () => {
    render(<ViewSessionSequences sequences={mockSequences} />)
    expect(screen.getByText('Échauffement')).toBeInTheDocument()
    expect(screen.getByText('Exercice principal')).toBeInTheDocument()
  })

  it('affiche les types de séquence en français', () => {
    render(<ViewSessionSequences sequences={mockSequences} />)
    expect(screen.getByText('Échauffement')).toBeInTheDocument()
    expect(screen.getByText('Principal')).toBeInTheDocument()
  })

  it('affiche les détails de durée et d\'intensité', () => {
    render(<ViewSessionSequences sequences={mockSequences} />)
    expect(screen.getByText('Durée: 15min')).toBeInTheDocument()
    expect(screen.getByText('Intensité: Faible')).toBeInTheDocument()
    expect(screen.getByText('Durée: 30min')).toBeInTheDocument()
    expect(screen.getByText('Intensité: Élevée')).toBeInTheDocument()
  })

  it('affiche les descriptions des séquences', () => {
    render(<ViewSessionSequences sequences={mockSequences} />)
    expect(screen.getByText('Séquence d\'échauffement')).toBeInTheDocument()
    expect(screen.getByText('Séquence principale')).toBeInTheDocument()
  })
})
