import type { ReactNode } from 'react'
import { useAppSelector } from '@/hooks'
import { PageLoader } from '@/components/PageLoader'
import { selectAuthStatus, selectIsAuthenticated, selectUser } from '@/slices/authSlice'

export interface AuthGateProps {
  children: ReactNode
}

export function AuthGate({ children }: AuthGateProps): React.JSX.Element {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const user = useAppSelector(selectUser)
  const status = useAppSelector(selectAuthStatus)

  const isRestoring =
    status === 'loading' || (isAuthenticated && user === null)

  if (isRestoring) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <PageLoader />
      </div>
    )
  }

  return <>{children}</>
}
