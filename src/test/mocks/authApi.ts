import { vi } from 'vitest'
import type { LoginResult } from '@/services/api/authApi'
import type { User } from '@/types'
import { mockAdminUser, mockUser } from '@/test/fixtures'

export const authApiMocks = {
  login: vi.fn(),
  logout: vi.fn(),
  fetchMe: vi.fn(),
  register: vi.fn(),
  forgotPassword: vi.fn(),
  resetPassword: vi.fn(),
}

vi.mock('@/services/api/authApi', () => ({
  login: (...args: unknown[]) => authApiMocks.login(...args),
  logout: (...args: unknown[]) => authApiMocks.logout(...args),
  fetchMe: (...args: unknown[]) => authApiMocks.fetchMe(...args),
  register: (...args: unknown[]) => authApiMocks.register(...args),
  forgotPassword: (...args: unknown[]) => authApiMocks.forgotPassword(...args),
  resetPassword: (...args: unknown[]) => authApiMocks.resetPassword(...args),
}))

export function mockLoginSuccess(user: User = mockUser): LoginResult {
  return { user }
}

export function resetAuthApiMocks(): void {
  Object.values(authApiMocks).forEach((mockFn) => mockFn.mockReset())
}

export function setupDefaultAuthApiMocks(): void {
  resetAuthApiMocks()
  authApiMocks.login.mockResolvedValue(mockLoginSuccess())
  authApiMocks.logout.mockResolvedValue(undefined)
  authApiMocks.fetchMe.mockResolvedValue(mockUser)
  authApiMocks.register.mockResolvedValue(mockAdminUser)
  authApiMocks.forgotPassword.mockResolvedValue(undefined)
  authApiMocks.resetPassword.mockResolvedValue(undefined)
}
