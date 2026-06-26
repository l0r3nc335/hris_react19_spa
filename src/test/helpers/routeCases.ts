import { ROUTES } from '@/constants/routes'
import { PERMISSIONS, type Permission } from '@/constants/permissions'

export const KNOWN_PUBLIC_ROUTES = [
  ROUTES.public.landing,
  ROUTES.public.about,
  ROUTES.public.pricing,
  ROUTES.public.contactus,
] as const

export const KNOWN_AUTH_ROUTES = [
  ROUTES.auth.login,
  ROUTES.auth.register,
  ROUTES.auth.forgotPassword,
  ROUTES.auth.resetPassword,
] as const

export const KNOWN_DASHBOARD_ROUTES = [ROUTES.dashboard.dashboard, ROUTES.dashboard.home] as const

export const UNKNOWN_ROUTES = ['/unknown', '/foo/bar', '/dashboard/missing-page'] as const

export interface PermissionCase {
  label: string
  role: string
  permissions: Permission[]
  check: Permission
  expected: boolean
}

export const PERMISSION_MATRIX: PermissionCase[] = [
  {
    label: 'admin grants all permissions',
    role: 'admin',
    permissions: [],
    check: PERMISSIONS.usersWrite,
    expected: true,
  },
  {
    label: 'user with permission',
    role: 'user',
    permissions: [PERMISSIONS.usersRead],
    check: PERMISSIONS.usersRead,
    expected: true,
  },
  {
    label: 'user without permission',
    role: 'user',
    permissions: [PERMISSIONS.usersRead],
    check: PERMISSIONS.usersWrite,
    expected: false,
  },
]
