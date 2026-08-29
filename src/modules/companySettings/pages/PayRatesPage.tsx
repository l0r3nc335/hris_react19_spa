import { NamedSettingsListPage } from './NamedSettingsListPage'
import { companyPayRatesApi } from '@/services/api/companySettingsApi'

export function PayRatesPage(): React.JSX.Element {
  return (
    <NamedSettingsListPage
      title="Pay Rate Types"
      description="Rate types used in payroll."
      api={companyPayRatesApi}
      moduleSlug="pay_rates"
    />
  )
}
