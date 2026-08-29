import type { ReactNode } from 'react'
import { PageShell, type PageShellProps } from '@/components/layout/PageShell'
import { cn } from '@/lib/utils'

export interface WorkforcePageShellProps extends PageShellProps {
  className?: string
  contentClassName?: string
  children: ReactNode
}

/** Standard white content card on light gray canvas — Workforce visual language. */
export function WorkforcePageShell({
  className,
  contentClassName,
  children,
  ...shellProps
}: WorkforcePageShellProps): React.JSX.Element {
  return (
    <PageShell {...shellProps}>
      <div
        className={cn(
          'rounded-xl border border-border bg-card p-6 shadow-sm',
          contentClassName,
          className,
        )}
      >
        {children}
      </div>
    </PageShell>
  )
}
