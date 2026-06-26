import { isKnownRoute, ROUTES } from '@/constants/routes'

export const LAST_KNOWN_ROUTE_KEY = 'hris:lastKnownRoute'

export function readLastKnownRoute(): string | null {
  try {
    const value = sessionStorage.getItem(LAST_KNOWN_ROUTE_KEY)
    if (!value || !isKnownRoute(value)) return null
    return value
  } catch {
    return null
  }
}

export function writeLastKnownRoute(pathname: string): void {
  try {
    sessionStorage.setItem(LAST_KNOWN_ROUTE_KEY, pathname)
  } catch {
    // sessionStorage may be unavailable in some environments
  }
}

export function resolveNotFoundBackTarget(
  lastKnownRoute: string | null,
  pathname: string,
  isAuthenticated: boolean,
): string {
  const candidate = lastKnownRoute ?? readLastKnownRoute()
  if (candidate && isKnownRoute(candidate)) {
    return candidate
  }
  if (pathname.startsWith('/auth')) {
    return ROUTES.auth.login
  }
  if (isAuthenticated) {
    return ROUTES.dashboard.dashboard
  }
  return ROUTES.public.landing
}
