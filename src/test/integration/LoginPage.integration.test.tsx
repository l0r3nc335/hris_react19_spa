import { describe, expect, it } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginPage } from '@/modules/auth/pages/LoginPage'
import { ROUTES } from '@/constants/routes'
import { renderWithProviders } from '@/test/utils'
import { canReachApi } from '@/test/integration/helpers'

const apiAvailable = await canReachApi()

describe.skipIf(!apiAvailable)('LoginPage integration', () => {
  it('submits credentials against the live API', async () => {
    const user = userEvent.setup()
    const { store } = renderWithProviders(<LoginPage />, {
      initialEntries: [ROUTES.auth.login],
      routePath: ROUTES.auth.login,
    })

    await user.type(screen.getByLabelText(/email/i), 'admin@hris.com')
    await user.type(screen.getByLabelText(/password/i), 'password')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(
      () => {
        expect(store.getState().auth.isAuthenticated).toBe(true)
      },
      { timeout: 15_000 },
    )
  })
})
