
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { SequenceForm } from '../SequenceForm'
import { Sequence } from '@/types/sequence'
import { BrowserRouter } from 'react-router-dom'

// Mock supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getSession: () => Promise.resolve({ data: { session: { user: { id: '1' } } } })
    },
    from: () => ({
      insert: () => ({
        select: () => ({
          single: () => Promise.resolve({ data: { id: '1' }, error: null })
        })
      })
    })
  }
}))

const mockSequences: Sequence[] = [
  {
    id: '1',
    title: 'Échauffement',
    description: 'Description échauffement',
    duration: 15,
    sequence_type: 'warmup',
    intensity_level: 'low',
    sequence_order: 1
  }
]

describe('SequenceForm Component', () => {
  it('affiche les séquences existantes', () => {
    render(
      <BrowserRouter>
        <SequenceForm 
          sequences={mockSequences} 
          onAddSequence={() => {}}
          onReorderSequences={() => {}}
        />
      </BrowserRouter>
    )

    expect(screen.getByText('Échauffement')).toBeInTheDocument()
    expect(screen.getByText('15 min')).toBeInTheDocument()
  })

  it('permet d\'ajouter une nouvelle séquence', async () => {
    const onAddSequence = vi.fn()
    render(
      <BrowserRouter>
        <SequenceForm 
          sequences={mockSequences} 
          onAddSequence={onAddSequence}
          onReorderSequences={() => {}}
        />
      </BrowserRouter>
    )

    // Remplir le formulaire
    fireEvent.change(screen.getByLabelText('Titre'), {
      target: { value: 'Nouvelle séquence' }
    })
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'Description test' }
    })
    fireEvent.change(screen.getByLabelText('Durée (minutes)'), {
      target: { value: '20' }
    })

    // Soumettre le formulaire
    const submitButton = screen.getByText('Ajouter la séquence')
    await fireEvent.click(submitButton)

    expect(onAddSequence).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Nouvelle séquence',
      description: 'Description test',
      duration: 20
    }))
  })

  it('valide les champs requis', async () => {
    render(
      <BrowserRouter>
        <SequenceForm 
          sequences={[]} 
          onAddSequence={() => {}}
          onReorderSequences={() => {}}
        />
      </BrowserRouter>
    )

    // Soumettre le formulaire sans remplir les champs
    const submitButton = screen.getByText('Ajouter la séquence')
    await fireEvent.click(submitButton)

    expect(screen.getByText('Le titre est requis')).toBeInTheDocument()
  })
})
