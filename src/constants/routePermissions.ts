import { MAIN_NAV } from './navigation'
import { PERMISSIONS, type Permission } from './permissions'

/** Dashboard route segment (e.g. `users`, `company-settings/profile`) -> optional permission */
export const ROUTE_SEGMENT_PERMISSIONS: Record<string, Permission> = {
  'admin/health': PERMISSIONS.tenantsManage,
  plan: PERMISSIONS.tenantsManage,
}

for (const item of MAIN_NAV) {
  if (!item.permission) continue
  const segment = item.path.startsWith('/') ? item.path.slice(1) : item.path
  // Prefer leaf permissions; skip overwriting if already set with a different value only when duplicate paths
  if (!ROUTE_SEGMENT_PERMISSIONS[segment]) {
    ROUTE_SEGMENT_PERMISSIONS[segment] = item.permission
  }
}
