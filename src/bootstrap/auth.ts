import { fetchMe, refreshSession, startSessionRestore } from '@/slices/authSlice'
import { bootstrapCsrf, setAuthHandlers } from '@/services/httpClient'
import type { AppStore } from '@/store'

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

  store.dispatch(startSessionRestore())

  void (async () => {
    await bootstrapCsrf()
    void store.dispatch(fetchMe())
  })()
}
