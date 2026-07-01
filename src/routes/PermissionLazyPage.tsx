import type { ComponentType, LazyExoticComponent } from 'react'
import { usePermission } from '@/hooks/usePermission'
import type { Permission } from '@/constants/permissions'
import { NotFoundPage } from './lazyRoutes'

export interface PermissionLazyPageProps {
  permissions?: Permission[]
  page: LazyExoticComponent<ComponentType<object>>
}

export function PermissionLazyPage({
  permissions,
  page: Page,
}: PermissionLazyPageProps): React.JSX.Element {
  const { can } = usePermission()

  if (permissions?.length && !permissions.some((p) => can(p))) {
    return <NotFoundPage />
  }

  return <Page />
}
