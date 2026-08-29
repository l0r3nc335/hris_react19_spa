import { NamedSettingsListPage } from './NamedSettingsListPage'
import { companyEmploymentBasisApi } from '@/services/api/companySettingsApi'

export function EmploymentBasisPage(): React.JSX.Element {
  return (
    <NamedSettingsListPage
      title="Employment Bases"
      description="Full-time, part-time, casual and other bases."
      api={companyEmploymentBasisApi}
      moduleSlug="employment_basis"
    />
  )
}
