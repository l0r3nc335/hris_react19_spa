import type { ComponentType, LazyExoticComponent, ReactNode } from 'react'
import { Suspense } from 'react'
import { PageLoader } from '@/components/PageLoader'
import type { Permission } from '@/constants/permissions'
import { PermissionLazyPage } from './PermissionLazyPage'

function toPermissionList(
  permissions?: Permission | Permission[],
): Permission[] | undefined {
  if (permissions === undefined) return undefined
  return Array.isArray(permissions) ? permissions : [permissions]
}

export function lazyRouteElement(
  page: LazyExoticComponent<ComponentType<object>>,
  permissions?: Permission | Permission[],
): ReactNode {
  return (
    <Suspense fallback={<PageLoader />}>
      <PermissionLazyPage permissions={toPermissionList(permissions)} page={page} />
    </Suspense>
  )
}
