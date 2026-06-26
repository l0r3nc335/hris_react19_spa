import { beforeEach, describe, expect, it } from 'vitest'
import { ROUTES } from '@/constants/routes'
import {
  LAST_KNOWN_ROUTE_KEY,
  readLastKnownRoute,
  resolveNotFoundBackTarget,
  writeLastKnownRoute,
} from '@/utils/lastKnownRoute'

describe('lastKnownRoute', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  describe('readLastKnownRoute', () => {
    it('returns null when storage is empty', () => {
      expect(readLastKnownRoute()).toBeNull()
    })

    it('returns null for unknown routes in storage', () => {
      sessionStorage.setItem(LAST_KNOWN_ROUTE_KEY, '/not-a-real-route')
      expect(readLastKnownRoute()).toBeNull()
    })

    it('returns known routes from storage', () => {
      sessionStorage.setItem(LAST_KNOWN_ROUTE_KEY, ROUTES.public.about)
      expect(readLastKnownRoute()).toBe(ROUTES.public.about)
    })
  })

  describe('writeLastKnownRoute', () => {
    it('persists pathname to sessionStorage', () => {
      writeLastKnownRoute(ROUTES.dashboard.dashboard)
      expect(sessionStorage.getItem(LAST_KNOWN_ROUTE_KEY)).toBe(ROUTES.dashboard.dashboard)
    })
  })

  describe('resolveNotFoundBackTarget', () => {
    it('prefers lastKnownRoute when valid', () => {
      expect(
        resolveNotFoundBackTarget(ROUTES.public.pricing, '/missing', false),
      ).toBe(ROUTES.public.pricing)
    })

    it('falls back to login for auth paths', () => {
      expect(resolveNotFoundBackTarget(null, '/auth/missing', false)).toBe(ROUTES.auth.login)
    })

    it('falls back to dashboard when authenticated', () => {
      expect(resolveNotFoundBackTarget(null, '/missing', true)).toBe(ROUTES.dashboard.dashboard)
    })

    it('falls back to landing for unauthenticated public context', () => {
      expect(resolveNotFoundBackTarget(null, '/missing', false)).toBe(ROUTES.public.landing)
    })

    it('reads from sessionStorage when lastKnownRoute arg is null', () => {
      sessionStorage.setItem(LAST_KNOWN_ROUTE_KEY, ROUTES.public.contactus)
      expect(resolveNotFoundBackTarget(null, '/missing', false)).toBe(ROUTES.public.contactus)
    })
  })
})
