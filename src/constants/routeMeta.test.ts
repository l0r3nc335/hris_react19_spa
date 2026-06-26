import { describe, expect, it } from 'vitest'
import { getRouteMeta, ROUTE_META } from '@/constants/routeMeta'
import { ROUTES } from '@/constants/routes'

describe('getRouteMeta', () => {
  it('returns metadata for a known dashboard route', () => {
    expect(getRouteMeta(ROUTES.dashboard.dashboard)).toEqual(
      ROUTE_META[ROUTES.dashboard.dashboard],
    )
  })

  it('normalizes trailing slashes', () => {
    expect(getRouteMeta(`${ROUTES.dashboard.dashboard}/`)).toEqual(
      ROUTE_META[ROUTES.dashboard.dashboard],
    )
  })

  it('returns default metadata for unknown routes', () => {
    const meta = getRouteMeta('/unknown-route')
    expect(meta.title).toBe('Page')
    expect(meta.category).toBe('HRIS')
    expect(meta.breadcrumbs).toHaveLength(2)
  })
})
