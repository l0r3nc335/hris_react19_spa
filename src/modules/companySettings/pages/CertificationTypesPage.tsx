import { NamedSettingsListPage } from './NamedSettingsListPage'
import { companyCertificationTypesApi } from '@/services/api/companySettingsApi'

export function CertificationTypesPage(): React.JSX.Element {
  return (
    <NamedSettingsListPage
      title="Certification Types"
      description="Certification catalogue for employees."
      api={companyCertificationTypesApi}
      moduleSlug="certifications"
    />
  )
}
