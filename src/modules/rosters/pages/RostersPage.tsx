import { useState } from 'react'
import { cn } from '@/lib/utils'
import { WorkforceResourcePage } from '@/components/workforce/WorkforceResourcePage'
import { rosterShiftsApi, shiftTypesApi } from '@/services/api/companySettingsApi'

export function RostersPage(): React.JSX.Element {
  const [view, setView] = useState<'shifts' | 'types'>('shifts')
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(['shifts', 'types'] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm font-medium',
              view === v ? 'bg-[var(--wf-orange)] text-white' : 'bg-muted text-muted-foreground',
            )}
          >
            {v === 'shifts' ? 'Roster' : 'Shift types'}
          </button>
        ))}
      </div>
      {view === 'shifts' ? (
        <WorkforceResourcePage
          title="Rosters"
          description="Daily, weekly, fortnightly and monthly rostering."
          api={rosterShiftsApi}
          nameKey="work_date"
          createFields={[
            { key: 'employee_id', label: 'Employee ID', required: true },
            { key: 'work_date', label: 'Work date (YYYY-MM-DD)', required: true },
            { key: 'starts_at', label: 'Starts at (HH:MM)' },
            { key: 'ends_at', label: 'Ends at (HH:MM)' },
          ]}
        />
      ) : (
        <WorkforceResourcePage
          title="Shift Types"
          description="Named shift patterns for rostering."
          api={shiftTypesApi}
          createFields={[{ key: 'name', label: 'Shift type name', required: true }]}
        />
      )}
    </div>
  )
}
