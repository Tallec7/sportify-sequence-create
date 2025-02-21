
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Dashboard from '../Dashboard'
import { useSessionsQuery } from '@/hooks/queries/useSessionsQuery'
import { useSessionDelete } from '@/hooks/useSessionDelete'

// Mock des hooks
vi.mock('@/hooks/queries/useSessionsQuery', () => ({
  useSessionsQuery: vi.fn()
}))

vi.mock('@/hooks/useSessionDelete', () => ({
  useSessionDelete: vi.fn()
}))

vi.mock('@/hooks/useAuthCheck', () => ({
  useAuthCheck: () => ({ userId: '1' })
}))

const mockSessions = [
  {
    id: '1',
    title: 'Session de test 1',
    description: 'Description de test 1',
    sport: 'Course',
    level: 'Débutant',
    duration: 60,
    participants_min: 1,
    participants_max: 10,
    created_at: '2024-01-01'
  },
  {
    id: '2',
    title: 'Session de test 2',
    description: 'Description de test 2',
    sport: 'Football',
    level: 'Intermédiaire',
    duration: 90,
    participants_min: 10,
    participants_max: 20,
    created_at: '2024-01-02'
  }
]

describe('Dashboard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('affiche le titre correctement', () => {
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
    vi.mocked(useSessionsQuery).mockReturnValue({
      sessions: mockSessions,
      loading: false,
      setSessions: vi.fn(),
      pagination: {
        currentPage: 1,
        totalPages: 1,
        itemsPerPage: 9,
        totalItems: 2
      },
      handlePageChange: vi.fn()
    })

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )

    expect(screen.getByText('Session de test 1')).toBeInTheDocument()
    expect(screen.getByText('Session de test 2')).toBeInTheDocument()
  })

  it('affiche le message de chargement', () => {
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

  it('gère la suppression d\'une session', () => {
    const mockHandleDelete = vi.fn()
    vi.mocked(useSessionDelete).mockReturnValue({ handleDelete: mockHandleDelete })
    vi.mocked(useSessionsQuery).mockReturnValue({
      sessions: mockSessions,
      loading: false,
      setSessions: vi.fn(),
      pagination: {
        currentPage: 1,
        totalPages: 1,
        itemsPerPage: 9,
        totalItems: 2
      },
      handlePageChange: vi.fn()
    })

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )

    // Simuler la suppression de la première session
    const deleteButtons = screen.getAllByText('Supprimer')
    fireEvent.click(deleteButtons[0])
    
    expect(mockHandleDelete).toHaveBeenCalledWith(mockSessions[0].id)
  })

  it('gère la pagination correctement', () => {
    const mockHandlePageChange = vi.fn()
    vi.mocked(useSessionsQuery).mockReturnValue({
      sessions: mockSessions,
      loading: false,
      setSessions: vi.fn(),
      pagination: {
        currentPage: 1,
        totalPages: 3,
        itemsPerPage: 9,
        totalItems: 25
      },
      handlePageChange: mockHandlePageChange
    })

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )

    // Tester le clic sur la page suivante
    fireEvent.click(screen.getByText('Page 2'))
    expect(mockHandlePageChange).toHaveBeenCalledWith(2)
  })
})

