import { WorkforceResourcePage } from '@/components/workforce/WorkforceResourcePage'
import { notificationsApi } from '@/services/api/companySettingsApi'

export function NotificationsPage(): React.JSX.Element {
  return (
    <WorkforceResourcePage
      title="Send Notifications"
      description="In-app notifications for company users."
      api={notificationsApi}
      nameKey="title"
      createFields={[
        { key: 'title', label: 'Title', required: true },
        { key: 'body', label: 'Message' },
      ]}
    />
  )
}
