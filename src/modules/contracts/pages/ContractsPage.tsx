import { useState } from 'react'
import { cn } from '@/lib/utils'
import { WorkforceResourcePage } from '@/components/workforce/WorkforceResourcePage'
import { documentTemplatesApi, employeeDocumentsApi } from '@/services/api/companySettingsApi'

export function ContractsPage(): React.JSX.Element {
  const [view, setView] = useState<'docs' | 'templates'>('docs')
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(['docs', 'templates'] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm font-medium',
              view === v ? 'bg-[var(--wf-orange)] text-white' : 'bg-muted text-muted-foreground',
            )}
          >
            {v === 'docs' ? 'Contracts' : 'Templates'}
          </button>
        ))}
      </div>
      {view === 'docs' ? (
        <WorkforceResourcePage
          title="Contract Management"
          description="Create, preview, sign, and track employee contracts."
          api={employeeDocumentsApi}
          nameKey="title"
          createFields={[
            { key: 'employee_id', label: 'Employee ID', required: true },
            { key: 'title', label: 'Contract title', required: true },
            { key: 'type', label: 'Type (contract)', required: true },
          ]}
        />
      ) : (
        <WorkforceResourcePage
          title="Contract Templates"
          description="WYSIWYG contract templates."
          api={documentTemplatesApi}
          createFields={[
            { key: 'name', label: 'Template name', required: true },
            { key: 'type', label: 'Type (contract)', required: true },
          ]}
        />
      )}
    </div>
  )
}
