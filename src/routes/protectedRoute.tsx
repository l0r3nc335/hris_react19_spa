import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '@/hooks'
import { selectAuthStatus, selectIsAuthenticated } from '@/slices/authSlice'
import { usePermission } from '@/hooks/usePermission'
import type { Permission } from '@/constants/permissions'
import { ROUTES } from '@/constants/routes'

export interface ProtectedRouteProps {
  permissions?: Permission[]
}

export function ProtectedRoute({
  permissions,
}: ProtectedRouteProps): React.JSX.Element {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const status = useAppSelector(selectAuthStatus)
  const { can } = usePermission()

  if (status === 'loading') return <></>
  if (!isAuthenticated) return <Navigate to={ROUTES.auth.login} replace />
  if (permissions?.length && !permissions.some((p) => can(p))) {
    return <Navigate to={ROUTES.dashboard.dashboard} replace />
  }
  return <Outlet />
}
