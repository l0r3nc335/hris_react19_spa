import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import { AuthGate } from '@/modules/auth/AuthGate'
import { mockRootState, mockUser } from '@/test/fixtures'
import { renderWithProviders } from '@/test/utils'

describe('AuthGate', () => {
  it('shows loader while auth status is loading', () => {
    renderWithProviders(
      <AuthGate>
        <div data-testid="app-content">App</div>
      </AuthGate>,
      {
        preloadedState: mockRootState({ auth: { status: 'loading' } }),
      },
    )
    expect(screen.queryByTestId('app-content')).not.toBeInTheDocument()
    expect(document.querySelectorAll('[data-slot="skeleton"]').length).toBeGreaterThan(0)
  })

  it('shows loader when authenticated but user is null', () => {
    renderWithProviders(
      <AuthGate>
        <div data-testid="app-content">App</div>
      </AuthGate>,
      {
        preloadedState: mockRootState({
          auth: { isAuthenticated: true, user: null, status: 'succeeded' },
        }),
      },
    )
    expect(screen.queryByTestId('app-content')).not.toBeInTheDocument()
  })

  it('renders children when session is ready', () => {
    renderWithProviders(
      <AuthGate>
        <div data-testid="app-content">App</div>
      </AuthGate>,
      {
        preloadedState: mockRootState({
          auth: { user: mockUser, isAuthenticated: true, status: 'succeeded' },
        }),
      },
    )
    expect(screen.getByTestId('app-content')).toBeInTheDocument()
  })
})
