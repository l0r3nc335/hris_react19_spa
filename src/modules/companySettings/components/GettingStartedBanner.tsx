import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { CheckCircle2, Circle } from 'lucide-react'
import { fetchCompanyOnboarding } from '@/services/api/companySettingsApi'

/** Non-blocking stepper for incomplete company onboarding modules. */
export function GettingStartedBanner(): React.JSX.Element | null {
  const { data } = useQuery({
    queryKey: ['company', 'onboarding'],
    queryFn: fetchCompanyOnboarding,
    staleTime: 60_000,
  })

  if (!data) return null

  const incomplete = data.modules.filter((m) => !m.completed)
  if (incomplete.length === 0) return null

  return (
    <div className="rounded-xl border border-[var(--wf-orange)]/30 bg-[var(--wf-orange-soft)] p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="font-semibold text-[var(--wf-navy)]">Getting started</h3>
          <p className="text-sm text-muted-foreground">
            {data.completedCount} of {data.totalCount} setup steps complete — finish these when
            ready.
          </p>
        </div>
      </div>
      <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {data.modules.map((mod) => (
          <li
            key={mod.id}
            className="flex items-center gap-2 rounded-lg border border-border/60 bg-card px-3 py-2 text-sm"
          >
            {mod.completed ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
            ) : (
              <Circle className="h-4 w-4 shrink-0 text-[var(--wf-orange)]" />
            )}
            <span className="min-w-0 flex-1 truncate">{mod.label}</span>
            {!mod.completed && mod.path ? (
              <Link
                to={mod.path}
                className="text-xs font-medium text-[var(--wf-orange)] hover:underline"
              >
                Open
              </Link>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  )
}
