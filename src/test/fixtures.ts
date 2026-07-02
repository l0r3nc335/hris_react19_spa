import type { AuthState } from '@/slices/authSlice'
import type { UiState } from '@/slices/uiSlice'
import type { RootState } from '@/store'
import type { User } from '@/types'
import { PERMISSIONS } from '@/constants/permissions'

const baseEntity = {
  tenantId: 'tenant-1',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
}

export const mockUser: User = {
  ...baseEntity,
  id: 'user-1',
  email: 'user@example.com',
  firstName: 'Test',
  lastName: 'User',
  role: 'user',
  permissions: [PERMISSIONS.usersRead],
  isActive: true,
}

export const mockAdminUser: User = {
  ...baseEntity,
  id: 'admin-1',
  email: 'admin@example.com',
  firstName: 'Admin',
  lastName: 'User',
  role: 'admin',
  permissions: [],
  isActive: true,
}

export const mockAuthState = (overrides: Partial<AuthState> = {}): AuthState => ({
  user: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
  ...overrides,
})

export const mockUiState = (overrides: Partial<UiState> = {}): UiState => ({
  sidebarOpen: true,
  theme: 'system',
  globalLoading: false,
  expandedNavGroups: [],
  notificationsOpen: false,
  commandPaletteOpen: false,
  sidebarSearchQuery: '',
  ...overrides,
})

export const mockRootState = (overrides: {
  auth?: Partial<AuthState>
  ui?: Partial<UiState>
} = {}): RootState =>
  ({
    auth: mockAuthState(overrides.auth),
    ui: mockUiState(overrides.ui),
  }) as RootState
