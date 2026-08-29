import { NamedSettingsListPage } from './NamedSettingsListPage'
import { companyClassificationsApi } from '@/services/api/companySettingsApi'

export function ClassificationsPage(): React.JSX.Element {
  return (
    <NamedSettingsListPage
      title="Classifications"
      description="Pay classifications and ranges."
      api={companyClassificationsApi}
      moduleSlug="classifications"
    />
  )
}
