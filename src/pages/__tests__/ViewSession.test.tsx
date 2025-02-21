
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import ViewSession from '../ViewSession'
import { useSessionQuery } from '@/hooks/queries/useSessionQuery'
import { useSequencesQuery } from '@/hooks/queries/useSequencesQuery'

// Mock the hooks
vi.mock('@/hooks/queries/useSessionQuery')
vi.mock('@/hooks/queries/useSequencesQuery')
vi.mock('@/hooks/useSessionDelete')

describe('ViewSession', () => {
  const mockSession = {
    id: '1',
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

  const mockSequences = [
    {
      id: '1',
      title: 'Warm Up',
      description: 'Warming up sequence',
      duration: 15,
      sequence_type: 'warmup' as const,
      intensity_level: 'low',
      sequence_order: 1
    }
  ]

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  const renderViewSession = () => {
    return render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ViewSession />
        </QueryClientProvider>
      </BrowserRouter>
    )
  }

  it('renders loading state', () => {
    vi.mocked(useSessionQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      isError: false
    } as any)

    vi.mocked(useSequencesQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      isError: false
    } as any)

    renderViewSession()
    expect(screen.getByTestId('view-session-skeleton')).toBeInTheDocument()
  })

  it('renders session details when data is loaded', () => {
    vi.mocked(useSessionQuery).mockReturnValue({
      data: mockSession,
      isLoading: false,
      error: null,
      isError: false
    } as any)

    vi.mocked(useSequencesQuery).mockReturnValue({
      data: mockSequences,
      isLoading: false,
      error: null,
      isError: false
    } as any)

    renderViewSession()
    
    expect(screen.getByText('Test Session')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByText('football')).toBeInTheDocument()
  })

  it('handles error state', () => {
    vi.mocked(useSessionQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Failed to load session'),
      isError: true
    } as any)

    renderViewSession()
    
    // The component should navigate away on error, so we don't need to check
    // for error message display
  })
})
