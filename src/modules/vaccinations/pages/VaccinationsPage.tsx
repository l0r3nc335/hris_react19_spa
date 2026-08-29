import { WorkforceResourcePage } from '@/components/workforce/WorkforceResourcePage'
import { employeeVaccinationsApi, vaccinationExemptionsApi } from '@/services/api/companySettingsApi'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function VaccinationsPage(): React.JSX.Element {
  const [view, setView] = useState<'records' | 'exemptions'>('records')
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(['records', 'exemptions'] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm font-medium',
              view === v ? 'bg-[var(--wf-orange)] text-white' : 'bg-muted text-muted-foreground',
            )}
          >
            {v === 'records' ? 'Vaccinations' : 'Exemptions'}
          </button>
        ))}
      </div>
      {view === 'records' ? (
        <WorkforceResourcePage
          title="Vaccinations"
          description="Track employee vaccinations and submissions."
          api={employeeVaccinationsApi}
          nameKey="status"
          createFields={[
            { key: 'employee_id', label: 'Employee ID', required: true },
            { key: 'vaccination_type_id', label: 'Vaccination type ID', required: true },
            { key: 'administered_on', label: 'Administered on (YYYY-MM-DD)' },
          ]}
        />
      ) : (
        <WorkforceResourcePage
          title="Vaccination Exemptions"
          description="Review exemption requests."
          api={vaccinationExemptionsApi}
          nameKey="reason"
          createFields={[
            { key: 'employee_id', label: 'Employee ID', required: true },
            { key: 'vaccination_type_id', label: 'Vaccination type ID', required: true },
            { key: 'reason', label: 'Reason', required: true },
          ]}
        />
      )}
    </div>
  )
}
