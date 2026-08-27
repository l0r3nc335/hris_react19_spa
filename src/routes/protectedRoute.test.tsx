import { describe, expect, it, vi } from 'vitest'
import { Route, Routes } from 'react-router-dom'
import { screen } from '@testing-library/react'
import { ProtectedRoute } from '@/routes/protectedRoute'
import { ROUTES } from '@/constants/routes'
import { mockRootState, mockUser } from '@/test/fixtures'
import { renderWithProviders } from '@/test/utils'
import { PERMISSIONS } from '@/constants/permissions'

vi.mock('@/layouts/PublicNotFoundShell', () => ({
  PublicNotFoundShell: () => <div data-testid="public-not-found-shell">Not Found Shell</div>,
}))

function TestChild() {
  return <div data-testid="protected-child">Protected Content</div>
}

function renderProtectedRoute(
  pathname: string,
  preloadedState = mockRootState(),
  permissions?: (typeof PERMISSIONS)[keyof typeof PERMISSIONS][],
) {
  return renderWithProviders(
    <Routes>
      <Route element={<ProtectedRoute permissions={permissions} />}>
        <Route path="*" element={<TestChild />} />
      </Route>
    </Routes>,
    {
      preloadedState,
      initialEntries: [pathname],
      routePath: '*',
    },
  )
}

describe('ProtectedRoute', () => {
  it('renders nothing while auth status is loading', () => {
    const { container } = renderProtectedRoute(
      ROUTES.dashboard.dashboard,
      mockRootState({ auth: { status: 'loading' } }),
    )
    expect(container).toBeEmptyDOMElement()
  })

  it('redirects unauthenticated users on known routes to login', () => {
    renderProtectedRoute(ROUTES.dashboard.dashboard)
    expect(screen.queryByTestId('protected-child')).not.toBeInTheDocument()
  })

  it('shows public not found shell for unknown routes when unauthenticated', () => {
    renderProtectedRoute('/totally-unknown')
    expect(screen.getByTestId('public-not-found-shell')).toBeInTheDocument()
  })

  it('renders outlet when authenticated', () => {
    renderProtectedRoute(
      ROUTES.dashboard.dashboard,
      mockRootState({
        auth: { user: mockUser, isAuthenticated: true, status: 'succeeded' },
      }),
    )
    expect(screen.getByTestId('protected-child')).toBeInTheDocument()
  })

  it('redirects when required permissions are missing', () => {
    renderProtectedRoute(
      ROUTES.dashboard.dashboard,
      mockRootState({
        auth: { user: mockUser, isAuthenticated: true, status: 'succeeded' },
      }),
      [PERMISSIONS.usersWrite],
    )
    expect(screen.queryByTestId('protected-child')).not.toBeInTheDocument()
  })
})
