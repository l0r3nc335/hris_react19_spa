import { useEffect, useState } from 'react'
import { WorkforcePageShell } from '@/components/workforce/WorkforcePageShell'
import { workforceGetData } from '@/services/api/workforceApi'

interface EmployeeStats {
  total: number
  active: number
  terminated: number
}

export function ReportingPage(): React.JSX.Element {
  const [stats, setStats] = useState<EmployeeStats | null>(null)

  useEffect(() => {
    void workforceGetData<EmployeeStats>('/employees/stats')
      .then(setStats)
      .catch(() => setStats(null))
  }, [])

  return (
    <WorkforcePageShell
      title="Reporting"
      description="Workforce aggregates for your company."
      contentClassName="grid gap-4 sm:grid-cols-3"
    >
      {[
        { label: 'Total employees', value: stats?.total ?? '—' },
        { label: 'Active', value: stats?.active ?? '—' },
        { label: 'Terminated', value: stats?.terminated ?? '—' },
      ].map((card) => (
        <div key={card.label} className="rounded-xl border border-border bg-[var(--wf-content-bg)] p-5">
          <p className="text-sm text-muted-foreground">{card.label}</p>
          <p className="mt-2 text-3xl font-semibold text-[var(--wf-navy)]">{card.value}</p>
        </div>
      ))}
    </WorkforcePageShell>
  )
}
