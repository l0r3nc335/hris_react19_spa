import { WorkforceResourcePage } from '@/components/workforce/WorkforceResourcePage'
import { complianceTypesApi, employeeCompliancesApi } from '@/services/api/companySettingsApi'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function CompliancePage(): React.JSX.Element {
  const [view, setView] = useState<'records' | 'types'>('records')
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(['records', 'types'] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm font-medium',
              view === v ? 'bg-[var(--wf-orange)] text-white' : 'bg-muted text-muted-foreground',
            )}
          >
            {v === 'records' ? 'Employee compliance' : 'Compliance types'}
          </button>
        ))}
      </div>
      {view === 'records' ? (
        <WorkforceResourcePage
          title="Compliance"
          description="Employee compliance tracking."
          api={employeeCompliancesApi}
          nameKey="status"
          createFields={[
            { key: 'employee_id', label: 'Employee ID', required: true },
            { key: 'compliance_type_id', label: 'Compliance type ID', required: true },
            { key: 'expires_on', label: 'Expires on (YYYY-MM-DD)' },
          ]}
        />
      ) : (
        <WorkforceResourcePage
          title="Compliance Types"
          description="Compliance categories for roles."
          api={complianceTypesApi}
          createFields={[{ key: 'name', label: 'Type name', required: true }]}
        />
      )}
    </div>
  )
}
