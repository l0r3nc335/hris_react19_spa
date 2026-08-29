import { WorkforceResourcePage } from '@/components/workforce/WorkforceResourcePage'
import { timesheetsApi } from '@/services/api/companySettingsApi'

export function TimesheetsPage(): React.JSX.Element {
  return (
    <WorkforceResourcePage
      title="Timesheets"
      description="Submit and approve employee timesheets."
      api={timesheetsApi}
      nameKey="status"
      createFields={[
        { key: 'employee_id', label: 'Employee ID', required: true },
        { key: 'period_start', label: 'Period start (YYYY-MM-DD)', required: true },
        { key: 'period_end', label: 'Period end (YYYY-MM-DD)', required: true },
        { key: 'total_hours', label: 'Total hours' },
      ]}
      columns={[
        { key: 'employee', header: 'Employee', render: (r) => String(r.employee_id ?? '—') },
        {
          key: 'period',
          header: 'Period',
          render: (r) => `${r.period_start ?? ''} → ${r.period_end ?? ''}`,
        },
        { key: 'hours', header: 'Hours', render: (r) => String(r.total_hours ?? 0) },
        { key: 'status', header: 'Status', render: (r) => String(r.status ?? 'draft') },
      ]}
    />
  )
}
