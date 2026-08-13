import { fetchMe, startSessionRestore } from '@/slices/authSlice'
import { bootstrapCsrf } from '@/services/httpClient'
import type { AppStore } from '@/store'

export function bootstrapAuth(store: AppStore): void {
  store.dispatch(startSessionRestore())

  void (async () => {
    try {
      await bootstrapCsrf()
    } catch {
      // CSRF may fail for guests if the API is down; still attempt /me so AuthGate leaves loading.
    }
    void store.dispatch(fetchMe())
  })()
}
