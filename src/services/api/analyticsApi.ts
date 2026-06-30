import { endpoints } from '@/constants/endpoints'
import { apiGet } from './client'

export interface DashboardMetric {
  label: string
  value: string | number
}

export interface DashboardData {
  metrics: DashboardMetric[]
}

export async function getDashboard(): Promise<DashboardData> {
  return apiGet<DashboardData>(endpoints.analytics.dashboard)
}
