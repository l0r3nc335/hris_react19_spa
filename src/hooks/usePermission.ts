import { useCallback } from 'react'
import { useAppSelector } from '@/hooks'
import { selectUser } from '@/slices/authSlice'
import type { Permission } from '@/constants/permissions'

export function usePermission(): { can: (permission: Permission) => boolean; permissions: string[] } {
  const user = useAppSelector(selectUser)
  const permissions = user?.permissions ?? []

  const can = useCallback(
    (permission: Permission): boolean => {
      if (!user) return false
      if (user.role === 'admin' || user.role === 'superadmin') return true
      return permissions.includes(permission)
    },
    [permissions, user],
  )

  return { can, permissions }
}
