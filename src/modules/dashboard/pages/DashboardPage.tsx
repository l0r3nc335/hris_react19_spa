import { WorkforcePageShell } from '@/components/workforce/WorkforcePageShell'

export function DashboardPage(): React.JSX.Element {
  return (
    <WorkforcePageShell
      title="Dashboard"
      description="Workforce overview and shortcuts."
      contentClassName="space-y-4"
    >
      <p className="text-sm text-muted-foreground">
        Welcome to Workforce. Use the sidebar to navigate people, operations, travel, and company
        settings.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {['People', 'Operational', 'Company Settings'].map((label) => (
          <div
            key={label}
            className="rounded-xl border border-border bg-[var(--wf-content-bg)] p-5"
          >
            <h3 className="font-semibold text-[var(--wf-navy)]">{label}</h3>
            <p className="mt-1 text-sm text-muted-foreground">Module metrics coming soon.</p>
          </div>
        ))}
      </div>
    </WorkforcePageShell>
  )
}
