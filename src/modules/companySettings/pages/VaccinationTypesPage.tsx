import { NamedSettingsListPage } from './NamedSettingsListPage'
import { companyVaccinationTypesApi } from '@/services/api/companySettingsApi'

export function VaccinationTypesPage(): React.JSX.Element {
  return (
    <NamedSettingsListPage
      title="Vaccination Types"
      description="Required and optional vaccination types."
      api={companyVaccinationTypesApi}
      moduleSlug="vaccinations"
    />
  )
}
