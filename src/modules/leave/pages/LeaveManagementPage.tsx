import { WorkforceResourcePage } from '@/components/workforce/WorkforceResourcePage'
import { leaveRequestsApi, leaveTypesApi } from '@/services/api/companySettingsApi'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function LeaveManagementPage(): React.JSX.Element {
  const [view, setView] = useState<'requests' | 'types'>('requests')

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(['requests', 'types'] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm font-medium',
              view === v
                ? 'bg-[var(--wf-orange)] text-white'
                : 'bg-muted text-muted-foreground',
            )}
          >
            {v === 'requests' ? 'Leave requests' : 'Leave types'}
          </button>
        ))}
      </div>
      {view === 'requests' ? (
        <WorkforceResourcePage
          title="Leave Management"
          description="Apply, review, and manage leave requests."
          api={leaveRequestsApi}
          nameKey="reason"
          createFields={[
            { key: 'employee_id', label: 'Employee ID', required: true },
            { key: 'leave_type_id', label: 'Leave type ID', required: true },
            { key: 'starts_on', label: 'Start date (YYYY-MM-DD)', required: true },
            { key: 'ends_on', label: 'End date (YYYY-MM-DD)', required: true },
            { key: 'days', label: 'Days', required: true },
            { key: 'reason', label: 'Reason' },
          ]}
          columns={[
            { key: 'id', header: 'ID', render: (r) => r.id },
            { key: 'employee', header: 'Employee', render: (r) => String(r.employee_id ?? '—') },
            { key: 'dates', header: 'Dates', render: (r) => `${r.starts_on ?? ''} → ${r.ends_on ?? ''}` },
            { key: 'status', header: 'Status', render: (r) => String(r.status ?? 'pending') },
          ]}
        />
      ) : (
        <WorkforceResourcePage
          title="Leave Types"
          description="Configure leave categories for your company."
          api={leaveTypesApi}
          createFields={[{ key: 'name', label: 'Leave type name', required: true }]}
        />
      )}
    </div>
  )
}
