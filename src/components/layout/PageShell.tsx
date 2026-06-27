import type { ReactNode } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { AppBreadcrumbs } from './AppBreadcrumbs'
import { AppFooter } from './AppFooter'

export interface PageShellProps {
  children: ReactNode
  title?: string
  description?: string
  toolbar?: ReactNode
  showBreadcrumbs?: boolean
  showFooter?: boolean
}

export function PageShell({
  children,
  title,
  description,
  toolbar,
  showBreadcrumbs = true,
  showFooter = false,
}: PageShellProps): React.JSX.Element {
  return (
    <div className="flex min-h-full flex-col">
      <div className="flex-1 space-y-4">
        {showBreadcrumbs ? (
          <div className="md:hidden">
            <AppBreadcrumbs />
          </div>
        ) : null}
        {title || description || toolbar ? (
          <PageHeader title={title ?? ''} description={description} action={toolbar} />
        ) : null}
        {children}
      </div>
      {showFooter ? <AppFooter /> : null}
    </div>
  )
}
