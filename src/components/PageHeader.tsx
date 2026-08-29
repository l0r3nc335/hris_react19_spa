import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export interface PageHeaderProps {
  title: string
  description?: string
  action?: ReactNode
  icon?: ReactNode
}

export function PageHeader({
  title,
  description,
  action,
  icon,
}: PageHeaderProps): React.JSX.Element {
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        <div>
          <h1 className={cn('text-2xl font-bold tracking-tight text-[var(--wf-navy)]')}>
            {title}
          </h1>
          {description ? (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {icon ? (
          <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-muted/30 text-muted-foreground">
            {icon}
          </div>
        ) : null}
      </div>
      {action}
    </div>
  )
}
