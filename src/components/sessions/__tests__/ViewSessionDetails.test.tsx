
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ViewSessionDetails } from '../ViewSessionDetails'

describe('ViewSessionDetails Component', () => {
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

  it('affiche correctement les détails des participants', () => {
    render(<ViewSessionDetails formData={mockFormData} />)
    expect(screen.getByText('5-10 participants')).toBeInTheDocument()
  })

  it('affiche le nombre de participants quand min et max sont identiques', () => {
    const sameParticipantsData = {
      ...mockFormData,
      participants_min: 5,
      participants_max: 5
    }
    render(<ViewSessionDetails formData={sameParticipantsData} />)
    expect(screen.getByText('5 participants')).toBeInTheDocument()
  })

  it('affiche la catégorie d\'âge', () => {
    render(<ViewSessionDetails formData={mockFormData} />)
    expect(screen.getByText('U13')).toBeInTheDocument()
  })

  it('affiche "Non spécifié" quand la catégorie d\'âge est vide', () => {
    const noAgeData = {
      ...mockFormData,
      age_category: ""
    }
    render(<ViewSessionDetails formData={noAgeData} />)
    expect(screen.getByText('Non spécifié')).toBeInTheDocument()
  })

  it('affiche le niveau d\'intensité en français', () => {
    render(<ViewSessionDetails formData={mockFormData} />)
    expect(screen.getByText('Moyenne')).toBeInTheDocument()
  })
})
