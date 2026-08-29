import { WorkforceResourcePage } from '@/components/workforce/WorkforceResourcePage'
import { travelLogsApi } from '@/services/api/companySettingsApi'

export function TravelLogPage(): React.JSX.Element {
  return (
    <WorkforceResourcePage
      title="Travel Log"
      description="Travel and accommodation bookings."
      api={travelLogsApi}
      nameKey="title"
      createFields={[
        { key: 'title', label: 'Trip title', required: true },
        { key: 'starts_on', label: 'Start date (YYYY-MM-DD)', required: true },
        { key: 'ends_on', label: 'End date (YYYY-MM-DD)' },
        { key: 'destination', label: 'Destination' },
        { key: 'accommodation', label: 'Accommodation' },
        { key: 'employee_id', label: 'Employee ID' },
      ]}
    />
  )
}
