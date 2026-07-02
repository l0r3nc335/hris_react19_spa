import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/ui'
import { useAppSelector } from '@/hooks'
import { selectIsAuthenticated } from '@/slices/authSlice'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/constants/routes'

function resolveNotFoundBackTarget(pathname: string, isAuthenticated: boolean): string {
  if (pathname.startsWith('/auth')) {
    return ROUTES.auth.login
  }
  if (isAuthenticated) {
    return ROUTES.dashboard.dashboard
  }
  return ROUTES.public.landing
}

export function NotFoundPage(): React.JSX.Element {
  const { pathname } = useLocation()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const backTarget = resolveNotFoundBackTarget(pathname, isAuthenticated)
  const isDashboardContext = isAuthenticated && !pathname.startsWith('/auth')

  return (
    <div
      className={cn(
        'flex flex-col items-center px-4',
        isDashboardContext ? 'pt-2' : 'flex-1 justify-center',
      )}
    >
      <p className="text-7xl font-bold tracking-tight text-muted-foreground/25">404</p>
      <h1 className="mt-2 text-xl font-semibold">Page not found</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button className="mt-6" asChild>
        <Link to={backTarget}>
          <ArrowLeft />
          Go back
        </Link>
      </Button>
    </div>
  )
}
