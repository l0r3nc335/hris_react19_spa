import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { getRouteMeta } from '@/constants/routeMeta'

export function AppBreadcrumbs(): React.JSX.Element {
  const { pathname } = useLocation()
  const meta = getRouteMeta(pathname)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {meta.breadcrumbs.map((crumb, index) => {
          const isLast = index === meta.breadcrumbs.length - 1
          return (
            <React.Fragment key={`${crumb.label}-${index}`}>
              {index > 0 ? <BreadcrumbSeparator /> : null}
              <BreadcrumbItem>
                {isLast || !crumb.path ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={crumb.path}>{crumb.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
