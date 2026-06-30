import type { ReactNode } from 'react'
import type { Permission } from '@/constants/permissions'
import { usePermission } from '@/hooks/usePermission'

export interface RequirePermissionProps {
  permission: Permission
  children: ReactNode
  fallback?: ReactNode
}

export function RequirePermission({
  permission,
  children,
  fallback = null,
}: RequirePermissionProps): React.JSX.Element | null {
  const { can } = usePermission()
  if (!can(permission)) return <>{fallback}</>
  return <>{children}</>
}
