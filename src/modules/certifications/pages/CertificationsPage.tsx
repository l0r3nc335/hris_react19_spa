import { WorkforceResourcePage } from '@/components/workforce/WorkforceResourcePage'
import { employeeCertificationsApi } from '@/services/api/companySettingsApi'

export function CertificationsPage(): React.JSX.Element {
  return (
    <WorkforceResourcePage
      title="Certifications"
      description="Employee certification records."
      api={employeeCertificationsApi}
      nameKey="status"
      createFields={[
        { key: 'employee_id', label: 'Employee ID', required: true },
        { key: 'certification_type_id', label: 'Certification type ID', required: true },
        { key: 'issued_on', label: 'Issued on (YYYY-MM-DD)' },
        { key: 'expires_on', label: 'Expires on (YYYY-MM-DD)' },
      ]}
    />
  )
}
