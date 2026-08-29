import { NamedSettingsListPage } from './NamedSettingsListPage'
import { companyAllowancesApi } from '@/services/api/companySettingsApi'

export function AllowancesPage(): React.JSX.Element {
  return (
    <NamedSettingsListPage
      title="Allowances"
      description="Allowance catalogue for payroll."
      api={companyAllowancesApi}
      moduleSlug="allowances"
      createDefaults={{ amount: 0, frequency: 'fortnightly' }}
    />
  )
}
