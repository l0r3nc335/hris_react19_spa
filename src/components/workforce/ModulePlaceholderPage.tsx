import { Construction } from 'lucide-react'
import { WorkforcePageShell } from '@/components/workforce/WorkforcePageShell'

export interface ModulePlaceholderPageProps {
  title: string
  description?: string
  moduleKey?: string
}

export function ModulePlaceholderPage({
  title,
  description,
  moduleKey,
}: ModulePlaceholderPageProps): React.JSX.Element {
  return (
    <WorkforcePageShell
      title={title}
      description={description ?? `${title} module — coming soon.`}
    >
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-[var(--wf-orange-soft)] text-[var(--wf-orange)]">
          <Construction className="h-7 w-7" />
        </div>
        <p className="text-sm text-muted-foreground">
          This Workforce module is a placeholder shell.
          {moduleKey ? (
            <>
              {' '}
              (<code className="text-xs">{moduleKey}</code>)
            </>
          ) : null}
        </p>
      </div>
    </WorkforcePageShell>
  )
}
