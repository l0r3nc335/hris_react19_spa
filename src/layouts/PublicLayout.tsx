import { Outlet, Navigate } from 'react-router-dom'
import { useAppSelector } from '@/hooks'
import { selectIsAuthenticated } from '@/slices/authSlice'
import { ROUTES } from '@/constants/routes'
import { PublicNavbar } from '@/components/layout/PublicNavbar'

export function PublicLayout(): React.JSX.Element {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  if (isAuthenticated) return <Navigate to={ROUTES.dashboard.dashboard} replace />

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <PublicNavbar />
      <main className="flex min-h-0 flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  )
}
