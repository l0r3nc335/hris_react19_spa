import { fetchMe, refreshSession } from '@/slices/authSlice'
import { bootstrapCsrf, setAuthHandlers } from '@/services/httpClient'
import { ROUTES } from '@/constants/routes'
import type { AppStore } from '@/store'

const PUBLIC_AUTH_PATHS = [
  ROUTES.login,
  ROUTES.register,
  ROUTES.forgotPassword,
  ROUTES.resetPassword,
]

function shouldRestoreSession(): boolean {
  if (typeof window === 'undefined') return true
  return !PUBLIC_AUTH_PATHS.some((path) => window.location.pathname.startsWith(path))
}

export function bootstrapAuth(store: AppStore): void {
  setAuthHandlers({
    refresh: async () => {
      const result = await store.dispatch(refreshSession())
      return refreshSession.fulfilled.match(result)
    },
    unauthorized: () => {
      // Refresh already failed in the HTTP interceptor; local state is cleared by fetchMe.rejected.
    },
  })
  void (async () => {
    await bootstrapCsrf()
    if (shouldRestoreSession()) {
      void store.dispatch(fetchMe())
    }
  })()
}
