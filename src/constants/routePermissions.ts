import { MAIN_NAV } from './navigation'
import { PERMISSIONS, type Permission } from './permissions'

/** Dashboard route segment (e.g. `users`, `admin/health`) -> required permission */
export const ROUTE_SEGMENT_PERMISSIONS: Record<string, Permission> = {
  'admin/health': PERMISSIONS.tenantsManage,
}

for (const item of MAIN_NAV) {
  if (!item.permission) continue
  const segment = item.path.startsWith('/') ? item.path.slice(1) : item.path
  ROUTE_SEGMENT_PERMISSIONS[segment] = item.permission
}
