import { vi } from 'vitest'

export const httpClientMocks = {
  setTenantId: vi.fn(),
  clearSession: vi.fn(),
  bootstrapCsrf: vi.fn(),
  ensureCsrfReady: vi.fn(),
}

vi.mock('@/services/httpClient', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/services/httpClient')>()
  return {
    ...actual,
    setTenantId: (...args: unknown[]) => httpClientMocks.setTenantId(...args),
    clearSession: (...args: unknown[]) => httpClientMocks.clearSession(...args),
    bootstrapCsrf: (...args: unknown[]) => httpClientMocks.bootstrapCsrf(...args),
    ensureCsrfReady: (...args: unknown[]) => httpClientMocks.ensureCsrfReady(...args),
  }
})

export function resetHttpClientMocks(): void {
  httpClientMocks.setTenantId.mockReset()
  httpClientMocks.clearSession.mockReset()
  httpClientMocks.bootstrapCsrf.mockReset()
  httpClientMocks.ensureCsrfReady.mockReset()
  httpClientMocks.bootstrapCsrf.mockResolvedValue(undefined)
  httpClientMocks.ensureCsrfReady.mockResolvedValue(undefined)
}
