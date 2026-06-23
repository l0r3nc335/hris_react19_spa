import { MetricsDashboard } from '@/components/MetricsDashboard'
import { useAnalyticsDashboard } from '@/modules/analytics/hooks'

export function DashboardPage(): React.JSX.Element {
  const { data: dashboard, isLoading } = useAnalyticsDashboard()

  return (
    <MetricsDashboard
      title="Dashboard"
      description="HRIS analytics overview"
      isLoading={isLoading}
    />
  )
}
