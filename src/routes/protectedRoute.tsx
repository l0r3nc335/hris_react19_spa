import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '@/hooks'
import { selectAuthStatus, selectIsAuthenticated } from '@/slices/authSlice'
import { usePermission } from '@/hooks/usePermission'
import type { Permission } from '@/constants/permissions'
import { isKnownRoute, ROUTES } from '@/constants/routes'
import { PublicNotFoundShell } from '@/layouts/PublicNotFoundShell'

export interface ProtectedRouteProps {
  permissions?: Permission[]
}

export function ProtectedRoute({
  permissions,
}: ProtectedRouteProps): React.JSX.Element {
  const { pathname } = useLocation()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const status = useAppSelector(selectAuthStatus)
  const { can } = usePermission()

  if (status === 'loading') return <></>
  if (!isAuthenticated) {
    if (isKnownRoute(pathname)) {
      return <Navigate to={ROUTES.auth.login} replace />
    }
    return <PublicNotFoundShell />
  }
  if (permissions?.length && !permissions.some((p) => can(p))) {
    return <Navigate to={ROUTES.dashboard.dashboard} replace />
  }
  return <Outlet />
}
