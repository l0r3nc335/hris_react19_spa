import { describe, expect, it } from 'vitest'
import {
  setCommandPaletteOpen,
  setExpandedNavGroups,
  setGlobalLoading,
  setNotificationsOpen,
  setSidebarOpen,
  setSidebarSearchQuery,
  setTheme,
  toggleNavGroup,
  toggleSidebar,
  uiReducer,
} from '@/slices/uiSlice'
const getInitialState = () => uiReducer(undefined, { type: '@@INIT' })

describe('uiSlice', () => {
  it('toggles sidebar', () => {
    const state = getInitialState()
    const next = uiReducer(state, toggleSidebar())
    expect(next.sidebarOpen).toBe(!state.sidebarOpen)
  })

  it('sets sidebar open explicitly', () => {
    const next = uiReducer(getInitialState(), setSidebarOpen(false))
    expect(next.sidebarOpen).toBe(false)
  })

  it('sets theme', () => {
    const next = uiReducer(getInitialState(), setTheme('dark'))
    expect(next.theme).toBe('dark')
  })

  it('sets global loading', () => {
    const next = uiReducer(getInitialState(), setGlobalLoading(true))
    expect(next.globalLoading).toBe(true)
  })

  it('adds and removes expanded nav groups', () => {
    const initial = uiReducer(getInitialState(), setExpandedNavGroups([]))
    const expanded = uiReducer(initial, toggleNavGroup('custom-group'))
    expect(expanded.expandedNavGroups).toContain('custom-group')

    const collapsed = uiReducer(expanded, toggleNavGroup('custom-group'))
    expect(collapsed.expandedNavGroups).not.toContain('custom-group')
  })

  it('replaces expanded nav groups', () => {
    const next = uiReducer(getInitialState(), setExpandedNavGroups(['a', 'b']))
    expect(next.expandedNavGroups).toEqual(['a', 'b'])
  })

  it('sets notifications and command palette state', () => {
    let state = getInitialState()
    state = uiReducer(state, setNotificationsOpen(true))
    state = uiReducer(state, setCommandPaletteOpen(true))
    expect(state.notificationsOpen).toBe(true)
    expect(state.commandPaletteOpen).toBe(true)
  })

  it('sets sidebar search query', () => {
    const next = uiReducer(getInitialState(), setSidebarSearchQuery('users'))
    expect(next.sidebarSearchQuery).toBe('users')
  })
})
