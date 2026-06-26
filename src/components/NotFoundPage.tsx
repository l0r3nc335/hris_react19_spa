import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/ui'
import { useAppSelector } from '@/hooks'
import { selectIsAuthenticated } from '@/slices/authSlice'
import { selectLastKnownRoute } from '@/slices/uiSlice'
import { cn } from '@/lib/utils'
import { resolveNotFoundBackTarget } from '@/utils/lastKnownRoute'

export function NotFoundPage(): React.JSX.Element {
  const { pathname } = useLocation()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const lastKnownRoute = useAppSelector(selectLastKnownRoute)
  const isDashboardContext = isAuthenticated && !pathname.startsWith('/auth')
  const target = resolveNotFoundBackTarget(lastKnownRoute, pathname, isAuthenticated)

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
        <Link to={target}>
          <ArrowLeft />
          Go back
        </Link>
      </Button>
    </div>
  )
}
