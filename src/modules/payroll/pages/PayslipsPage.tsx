import { WorkforceResourcePage } from '@/components/workforce/WorkforceResourcePage'
import { payslipsApi } from '@/services/api/companySettingsApi'

export function PayslipsPage(): React.JSX.Element {
  return (
    <WorkforceResourcePage
      title="Payslips"
      description="Generated payslips for employees."
      api={payslipsApi}
      nameKey="status"
      createFields={[
        { key: 'employee_id', label: 'Employee ID', required: true },
        { key: 'period_start', label: 'Period start (YYYY-MM-DD)', required: true },
        { key: 'period_end', label: 'Period end (YYYY-MM-DD)', required: true },
        { key: 'gross', label: 'Gross' },
        { key: 'net', label: 'Net' },
      ]}
    />
  )
}
