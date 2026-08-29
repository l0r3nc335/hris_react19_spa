import { useState } from 'react'
import { cn } from '@/lib/utils'
import { WorkforceResourcePage } from '@/components/workforce/WorkforceResourcePage'
import { pdAssignmentsApi, pdTemplatesApi } from '@/services/api/companySettingsApi'

export function ProfessionalDevelopmentPage(): React.JSX.Element {
  const [view, setView] = useState<'assignments' | 'templates'>('assignments')
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(['assignments', 'templates'] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm font-medium',
              view === v ? 'bg-[var(--wf-orange)] text-white' : 'bg-muted text-muted-foreground',
            )}
          >
            {v === 'assignments' ? 'Assignments' : 'Templates'}
          </button>
        ))}
      </div>
      {view === 'assignments' ? (
        <WorkforceResourcePage
          title="Professional Development"
          description="Schedule and track employee development."
          api={pdAssignmentsApi}
          nameKey="title"
          createFields={[
            { key: 'employee_id', label: 'Employee ID', required: true },
            { key: 'title', label: 'Title', required: true },
            { key: 'scheduled_on', label: 'Scheduled date (YYYY-MM-DD)' },
          ]}
        />
      ) : (
        <WorkforceResourcePage
          title="PD Templates"
          description="Reusable professional development templates."
          api={pdTemplatesApi}
          createFields={[{ key: 'name', label: 'Template name', required: true }]}
        />
      )}
    </div>
  )
}
