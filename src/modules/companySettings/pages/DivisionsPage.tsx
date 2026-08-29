import { NamedSettingsListPage } from './NamedSettingsListPage'
import { companyDivisionsApi } from '@/services/api/companySettingsApi'

export function DivisionsPage(): React.JSX.Element {
  return (
    <NamedSettingsListPage
      title="Divisions"
      description="Organisational divisions for your company."
      api={companyDivisionsApi}
      moduleSlug="divisions"
    />
  )
}
