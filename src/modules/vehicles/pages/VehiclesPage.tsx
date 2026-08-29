import { WorkforceResourcePage } from '@/components/workforce/WorkforceResourcePage'
import { vehiclesApi } from '@/services/api/companySettingsApi'

export function VehiclesPage(): React.JSX.Element {
  return (
    <WorkforceResourcePage
      title="Vehicle Management"
      description="Fleet vehicles for travel rostering."
      api={vehiclesApi}
      createFields={[
        { key: 'name', label: 'Vehicle name', required: true },
        { key: 'registration', label: 'Registration' },
      ]}
    />
  )
}
