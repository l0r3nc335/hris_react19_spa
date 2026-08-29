import { NamedSettingsListPage } from './NamedSettingsListPage'
import { companyGroupsApi } from '@/services/api/companySettingsApi'

export function GroupsPage(): React.JSX.Element {
  return (
    <NamedSettingsListPage
      title="Groups"
      description="Teams and groups within your organisation."
      api={companyGroupsApi}
      moduleSlug="groups"
    />
  )
}
