import { useQuery } from '@tanstack/react-query'
import { listAudit } from '@/services/api/auditApi'
import { listReports } from '@/services/api/reportsApi'
import { getDashboard } from '@/services/api/analyticsApi'
import { listSystem } from '@/services/api/systemApi'
import { queryKeys } from '@/lib/queryKeys'
import { useFlatListQuery, usePaginatedListQuery } from './factory'
import type { ListQueryParams } from '@/services/api/client'

export * from './users/queries'
/*
export * from './employees/queries'
export * from './employeeDepartments/queries'
export * from './departments/queries'
export * from './positions/queries'
export * from './attendance/queries'
export * from './leave/queries'
export * from './payroll/queries'
export * from './compensation/queries'
export * from './timeTracking/queries'
export * from './recruitment/queries'
export * from './interviews/queries'
export * from './performance/queries'
export * from './organization/queries'
export * from './documents/queries'
export * from './notifications/queries'
export * from './roles/queries'
export * from './settings/queries'
export * from './tenants/queries'
export * from './billing/queries'
export * from './permissions/queries'
export * from './onboarding/queries'
export * from './benefits/queries'
export * from './training/queries'
export * from './reports/queries'
*/

export function useAuditList(params?: ListQueryParams) {
  return usePaginatedListQuery(queryKeys.audit.list(), listAudit, params)
}

export function useReportsList() {
  return useFlatListQuery(queryKeys.reports.list(), listReports)
}

export function useAnalyticsDashboard() {
  return useQuery({
    queryKey: queryKeys.analytics.dashboard(),
    queryFn: getDashboard,
  })
}

export function useSystemList() {
  return useFlatListQuery(queryKeys.system.list(), listSystem)
}
