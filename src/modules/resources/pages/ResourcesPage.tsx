import { WorkforceResourcePage } from '@/components/workforce/WorkforceResourcePage'
import { resourcesApi } from '@/services/api/companySettingsApi'

export function ResourcesPage(): React.JSX.Element {
  return (
    <WorkforceResourcePage
      title="Resources"
      description="Company resource library."
      api={resourcesApi}
      nameKey="title"
      createFields={[
        { key: 'title', label: 'Resource title', required: true },
        { key: 'category', label: 'Category' },
        { key: 'description', label: 'Description' },
      ]}
    />
  )
}
