import { NamedSettingsListPage } from './NamedSettingsListPage'
import { companyLocationsApi } from '@/services/api/companySettingsApi'

export function LocationsPage(): React.JSX.Element {
  return (
    <NamedSettingsListPage
      title="Locations"
      description="Work locations for your company."
      api={companyLocationsApi}
      moduleSlug="locations"
    />
  )
}
