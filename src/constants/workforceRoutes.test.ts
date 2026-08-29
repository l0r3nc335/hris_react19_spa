import { describe, expect, it } from 'vitest'
import { ROUTES } from '@/constants/routes'

describe('workforce company settings routes', () => {
  it('exposes modular company settings paths without forced order', () => {
    const paths = Object.values(ROUTES.companySettings)
    expect(paths).toContain('/company-settings')
    expect(paths).toContain('/company-settings/divisions')
    expect(paths).toContain('/company-settings/locations')
    expect(paths.every((p) => typeof p === 'string' && p.startsWith('/company-settings'))).toBe(true)
  })

  it('keeps people and operational routes separate from platform admin', () => {
    expect(ROUTES.people.employees).toBe('/employees')
    expect(ROUTES.operational.timesheets).toBe('/timesheets')
    expect(ROUTES.companySettings.hub).not.toContain('admin')
  })
})
