import { describe, expect, it } from 'vitest'
import { isKnownRoute, ROUTES } from '@/constants/routes'
import {
  KNOWN_AUTH_ROUTES,
  KNOWN_DASHBOARD_ROUTES,
  KNOWN_PUBLIC_ROUTES,
  UNKNOWN_ROUTES,
} from '@/test/helpers/routeCases'

describe('isKnownRoute', () => {
  it.each([...KNOWN_PUBLIC_ROUTES, ...KNOWN_AUTH_ROUTES, ...KNOWN_DASHBOARD_ROUTES])(
    'returns true for known route %s',
    (path) => {
      expect(isKnownRoute(path)).toBe(true)
    },
  )

  it.each(UNKNOWN_ROUTES)('returns false for unknown route %s', (path) => {
    expect(isKnownRoute(path)).toBe(false)
  })

  it('normalizes trailing slashes', () => {
    expect(isKnownRoute(`${ROUTES.public.about}/`)).toBe(true)
    expect(isKnownRoute(`${ROUTES.dashboard.dashboard}/`)).toBe(true)
  })

  it('does not strip trailing slash from root', () => {
    expect(isKnownRoute('/')).toBe(true)
  })
})
