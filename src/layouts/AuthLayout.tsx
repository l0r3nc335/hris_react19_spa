import { ROUTES } from '@/constants/routes'
import { useAppSelector } from '@/hooks'
import { selectAuthStatus, selectIsAuthenticated } from '@/slices/authSlice'
import { Navigate, Outlet } from 'react-router-dom'

export default function AuthLayout(): React.JSX.Element {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const status = useAppSelector(selectAuthStatus)

  if (status === 'loading') return <></>
  if (isAuthenticated) return <Navigate to={ROUTES.dashboard.dashboard} replace />

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[var(--wf-content-bg)]">
      <main className="flex min-h-0 flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
