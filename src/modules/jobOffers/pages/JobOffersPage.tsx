import { WorkforceResourcePage } from '@/components/workforce/WorkforceResourcePage'
import { employeeDocumentsApi, documentTemplatesApi } from '@/services/api/companySettingsApi'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function JobOffersPage(): React.JSX.Element {
  const [view, setView] = useState<'offers' | 'templates'>('offers')
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(['offers', 'templates'] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm font-medium',
              view === v ? 'bg-[var(--wf-orange)] text-white' : 'bg-muted text-muted-foreground',
            )}
          >
            {v === 'offers' ? 'Letters of offer' : 'Templates'}
          </button>
        ))}
      </div>
      {view === 'offers' ? (
        <WorkforceResourcePage
          title="Job Offers"
          description="Letters of offer — customise, sign, approve, or reject."
          api={employeeDocumentsApi}
          nameKey="title"
          createFields={[
            { key: 'employee_id', label: 'Employee ID', required: true },
            { key: 'title', label: 'Offer title', required: true },
            { key: 'type', label: 'Type (offer)', required: true },
          ]}
        />
      ) : (
        <WorkforceResourcePage
          title="Offer Templates"
          description="Reusable letter of offer templates."
          api={documentTemplatesApi}
          createFields={[
            { key: 'name', label: 'Template name', required: true },
            { key: 'type', label: 'Type (offer)', required: true },
          ]}
        />
      )}
    </div>
  )
}
