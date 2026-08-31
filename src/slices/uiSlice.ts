import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { DEFAULT_EXPANDED_NAV_GROUPS } from '@/constants/navigation'

export type ThemeMode = 'light' | 'dark' | 'system'

export interface UiState {
  sidebarOpen: boolean
  theme: ThemeMode
  globalLoading: boolean
  expandedNavGroups: string[]
  notificationsOpen: boolean
  commandPaletteOpen: boolean
  sidebarSearchQuery: string
}

const initialState: UiState = {
  sidebarOpen: true,
  theme: 'light',
  globalLoading: false,
  expandedNavGroups: DEFAULT_EXPANDED_NAV_GROUPS,
  notificationsOpen: false,
  commandPaletteOpen: false,
  sidebarSearchQuery: '',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.sidebarOpen = action.payload
    },
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.theme = action.payload
    },
    setGlobalLoading(state, action: PayloadAction<boolean>) {
      state.globalLoading = action.payload
    },
    toggleNavGroup(state, action: PayloadAction<string>) {
      const groupId = action.payload
      const index = state.expandedNavGroups.indexOf(groupId)
      if (index >= 0) {
        state.expandedNavGroups.splice(index, 1)
      } else {
        state.expandedNavGroups.push(groupId)
      }
    },
    setExpandedNavGroups(state, action: PayloadAction<string[]>) {
      state.expandedNavGroups = action.payload
    },
    setNotificationsOpen(state, action: PayloadAction<boolean>) {
      state.notificationsOpen = action.payload
    },
    setCommandPaletteOpen(state, action: PayloadAction<boolean>) {
      state.commandPaletteOpen = action.payload
    },
    setSidebarSearchQuery(state, action: PayloadAction<string>) {
      state.sidebarSearchQuery = action.payload
    },
  },
})

export const {
  toggleSidebar,
  setSidebarOpen,
  setTheme,
  setGlobalLoading,
  toggleNavGroup,
  setExpandedNavGroups,
  setNotificationsOpen,
  setCommandPaletteOpen,
  setSidebarSearchQuery,
} = uiSlice.actions
export const uiReducer = uiSlice.reducer
