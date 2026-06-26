import { beforeEach, describe, expect, it, vi } from 'vitest'
import { resolveTheme } from '@/hooks/useTheme'

describe('resolveTheme', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockImplementation((query: string) => ({
        matches: query.includes('dark'),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    )
  })

  it('returns light for light theme', () => {
    expect(resolveTheme('light')).toBe('light')
  })

  it('returns dark for dark theme', () => {
    expect(resolveTheme('dark')).toBe('dark')
  })

  it('resolves system theme from matchMedia', () => {
    expect(resolveTheme('system')).toBe('dark')
  })
})
