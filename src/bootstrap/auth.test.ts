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

  it('registers auth handlers and starts session restore', () => {
    const store = createTestStore()
    const dispatchSpy = vi.spyOn(store, 'dispatch')

    bootstrapAuth(store)

    expect(httpClientMocks.setAuthHandlers).toHaveBeenCalledWith(
      expect.objectContaining({
        refresh: expect.any(Function),
        unauthorized: expect.any(Function),
      }),
    )
    expect(dispatchSpy).toHaveBeenCalledWith(startSessionRestore())
    expect(httpClientMocks.bootstrapCsrf).toHaveBeenCalled()
  })
})
