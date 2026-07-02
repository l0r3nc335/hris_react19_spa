import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import { NotFoundPage } from '@/components/NotFoundPage'
import { ROUTES } from '@/constants/routes'
import { mockRootState } from '@/test/fixtures'
import { renderWithProviders } from '@/test/utils'

describe('NotFoundPage', () => {
  it('links to dashboard when authenticated in app context', () => {
    renderWithProviders(<NotFoundPage />, {
      preloadedState: mockRootState({
        auth: { isAuthenticated: true, status: 'succeeded' },
      }),
      initialEntries: ['/dashboard/missing'],
      routePath: '/dashboard/missing',
    })

    const link = screen.getByRole('link', { name: /go back/i })
    expect(link).toHaveAttribute('href', ROUTES.dashboard.dashboard)
  })

  it('links to landing for unauthenticated users', () => {
    renderWithProviders(<NotFoundPage />, {
      preloadedState: mockRootState(),
      initialEntries: ['/missing'],
      routePath: '/missing',
    })

    const link = screen.getByRole('link', { name: /go back/i })
    expect(link).toHaveAttribute('href', ROUTES.public.landing)
  })
})
