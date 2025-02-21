
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Dashboard from '../Dashboard'
import { useSessionsQuery } from '@/hooks/queries/useSessionsQuery'

// Mock des hooks
vi.mock('@/hooks/queries/useSessionsQuery', () => ({
  useSessionsQuery: vi.fn()
}))

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getSession: () => Promise.resolve({ data: { session: { user: { id: '1' } } } })
    }
  }
}))

const mockSessions = [
  {
    id: '1',
    title: 'Session de test',
    description: 'Description de test',
    sport: 'Course',
    level: 'Débutant',
    duration: 60,
    participants_min: 1,
    participants_max: 10,
    created_at: '2024-01-01'
  }
]

describe('Dashboard Component', () => {
  it('affiche le titre correctement', () => {
    // Configuration du mock
    vi.mocked(useSessionsQuery).mockReturnValue({
      sessions: [],
      loading: false,
      setSessions: vi.fn(),
      pagination: {
        currentPage: 1,
        totalPages: 1,
        itemsPerPage: 9,
        totalItems: 0
      },
      handlePageChange: vi.fn()
    })

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )

    expect(screen.getByText('Mes séances')).toBeInTheDocument()
  })

  it('affiche les sessions quand elles sont chargées', () => {
    // Configuration du mock avec des sessions
    vi.mocked(useSessionsQuery).mockReturnValue({
      sessions: mockSessions,
      loading: false,
      setSessions: vi.fn(),
      pagination: {
        currentPage: 1,
        totalPages: 1,
        itemsPerPage: 9,
        totalItems: 1
      },
      handlePageChange: vi.fn()
    })

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )

    expect(screen.getByText('Session de test')).toBeInTheDocument()
  })

  it('affiche le message de chargement', () => {
    // Configuration du mock en état de chargement
    vi.mocked(useSessionsQuery).mockReturnValue({
      sessions: [],
      loading: true,
      setSessions: vi.fn(),
      pagination: {
        currentPage: 1,
        totalPages: 1,
        itemsPerPage: 9,
        totalItems: 0
      },
      handlePageChange: vi.fn()
    })

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )

    expect(screen.getByText('Chargement des séances...')).toBeInTheDocument()
  })
})
