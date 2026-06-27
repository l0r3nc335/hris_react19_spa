import { endpoints } from '@/constants/endpoints'
import { apiGet } from './client'
import { createResourceApi } from './client'
import type { ReportsEntity } from '@/modules/reports/types'

const api = createResourceApi<ReportsEntity>({
  list: endpoints.reports.list,
  byId: endpoints.reports.byId,
})

export const listReports = api.list
export const getReports = api.getById
export const reportsApi = api

export type ReportType = 'employees' | 'attendance' | 'payroll' | 'leaveUsage' | 'turnover'

const reportEndpoints: Record<ReportType, string> = {
  employees: endpoints.reports.employees,
  attendance: endpoints.reports.attendance,
  payroll: endpoints.reports.payroll,
  leaveUsage: endpoints.reports.leaveUsage,
  turnover: endpoints.reports.turnover,
}

const reportLabels: Record<ReportType, string> = {
  employees: 'Employee Report',
  attendance: 'Attendance Report',
  payroll: 'Payroll Report',
  leaveUsage: 'Leave Usage Report',
  turnover: 'Turnover Report',
}

export function generateReport(type: ReportType): Promise<{ id: string; name: string }> {
  return apiGet<unknown>(reportEndpoints[type]).then(() => ({
    id: type,
    name: reportLabels[type],
  }))
}

export function fetchReportTypes(): Promise<{ type: ReportType; label: string }[]> {
  return Promise.resolve([
    { type: 'employees', label: 'Employee Report' },
    { type: 'attendance', label: 'Attendance Report' },
    { type: 'payroll', label: 'Payroll Report' },
    { type: 'leaveUsage', label: 'Leave Usage Report' },
    { type: 'turnover', label: 'Turnover Report' },
  ])
}

