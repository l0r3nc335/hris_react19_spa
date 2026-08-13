import { beforeEach, describe, expect, it, vi } from 'vitest'
import '@/test/mocks/httpClient'
import '@/test/mocks/authApi'
import { bootstrapAuth } from '@/bootstrap/auth'
import { startSessionRestore } from '@/slices/authSlice'
import { setupDefaultAuthApiMocks } from '@/test/mocks/authApi'
import { httpClientMocks } from '@/test/mocks/httpClient'
import { createTestStore } from '@/test/utils'

describe('bootstrapAuth', () => {
  beforeEach(() => {
    setupDefaultAuthApiMocks()
    httpClientMocks.bootstrapCsrf.mockResolvedValue(undefined)
  })

  it('starts session restore and bootstraps CSRF', () => {
    const store = createTestStore()
    const dispatchSpy = vi.spyOn(store, 'dispatch')

    bootstrapAuth(store)

    expect(dispatchSpy).toHaveBeenCalledWith(startSessionRestore())
    expect(httpClientMocks.bootstrapCsrf).toHaveBeenCalled()
  })
})
