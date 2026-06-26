import { describe, expect, it } from 'vitest'
import { usePermission } from '@/hooks/usePermission'
import { PERMISSION_MATRIX } from '@/test/helpers/routeCases'
import { mockAdminUser, mockRootState, mockUser } from '@/test/fixtures'
import { renderHookWithProviders } from '@/test/utils'
import type { User } from '@/types'

function userWith(role: string, permissions: User['permissions']): User {
  return { ...mockUser, role, permissions }
}

describe('usePermission', () => {
  it('denies all permissions when user is null', () => {
    const { result } = renderHookWithProviders(() => usePermission(), {
      preloadedState: mockRootState({ auth: { user: null, isAuthenticated: false } }),
    })
    expect(result.current.can('users:read')).toBe(false)
    expect(result.current.permissions).toEqual([])
  })

  it.each(PERMISSION_MATRIX)('$label', ({ role, permissions, check, expected }) => {
    const user = userWith(role, permissions)
    const { result } = renderHookWithProviders(() => usePermission(), {
      preloadedState: mockRootState({
        auth: { user, isAuthenticated: true, status: 'succeeded' },
      }),
    })
    expect(result.current.can(check)).toBe(expected)
  })

  it('returns user permissions array', () => {
    const { result } = renderHookWithProviders(() => usePermission(), {
      preloadedState: mockRootState({
        auth: { user: mockAdminUser, isAuthenticated: true, status: 'succeeded' },
      }),
    })
    expect(result.current.permissions).toEqual([])
  })
})
