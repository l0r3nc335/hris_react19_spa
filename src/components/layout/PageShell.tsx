import type { ReactNode } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { AppBreadcrumbs, type AppBreadcrumbItem  } from './AppBreadcrumbs'
import { AppFooter } from './AppFooter'

export interface PageShellProps {
  children: ReactNode
  title?: string
  description?: string
  toolbar?: ReactNode
  showBreadcrumbs?: boolean
  breadcrumbs?: AppBreadcrumbItem[]
  showFooter?: boolean
  icon?: ReactNode
}

export function PageShell({
  children,
  title,
  description,
  icon,
  toolbar,
  breadcrumbs,
  showBreadcrumbs = true,
  showFooter = false,
}: PageShellProps): React.JSX.Element {
  return (
    <div className="flex min-h-full flex-col">
      <div className="flex-1 space-y-4">
        {showBreadcrumbs && breadcrumbs?.length ? (
          <AppBreadcrumbs items={breadcrumbs} />
        ) : null}

        {title || description || toolbar ? (
          <PageHeader 
            title={title ?? ''} 
            description={description} 
            action={toolbar} 
            icon={icon}
          />
        ) : null}
        
        {children}
      </div>
      
      {showFooter ? <AppFooter /> : null}
    </div>
  )
}
