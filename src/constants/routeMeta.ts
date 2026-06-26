import { ROUTES } from './routes'

export interface BreadcrumbItem {
  label: string
  path?: string
}

export interface RouteMeta {
  title: string
  category: string
  breadcrumbs: BreadcrumbItem[]
}

const homeCrumb: BreadcrumbItem = { label: 'Home', path: ROUTES.dashboard.home }

export const ROUTE_META: Record<string, RouteMeta> = {
  [ROUTES.dashboard.dashboard]: {
    title: 'Dashboard',
    category: 'Overview',
    breadcrumbs: [{ label: 'Dashboard' }],
  },
  /*
  [ROUTES.analytics]: {
    title: 'Analytics',
    category: 'Overview',
    breadcrumbs: [homeCrumb, { label: 'Analytics' }],
  },
  [ROUTES.users]: {
    title: 'Users',
    category: 'People & Organization',
    breadcrumbs: [homeCrumb, { label: 'Users' }],
  },
  [ROUTES.employees]: {
    title: 'Employees',
    category: 'People & Organization',
    breadcrumbs: [homeCrumb, { label: 'Employees' }],
  },
  [ROUTES.employeeDepartments]: {
    title: 'Employee Department',
    category: 'People & Organization',
    breadcrumbs: [homeCrumb, { label: 'Employee Department' }],
  },
  [ROUTES.departments]: {
    title: 'Departments',
    category: 'People & Organization',
    breadcrumbs: [homeCrumb, { label: 'Departments' }],
  },
  [ROUTES.positions]: {
    title: 'Positions',
    category: 'People & Organization',
    breadcrumbs: [homeCrumb, { label: 'Positions' }],
  },
  [ROUTES.orgChart]: {
    title: 'Org Chart',
    category: 'People & Organization',
    breadcrumbs: [homeCrumb, { label: 'Org Chart' }],
  },
  [ROUTES.attendance]: {
    title: 'Attendance',
    category: 'Time & Attendance',
    breadcrumbs: [homeCrumb, { label: 'Attendance' }],
  },
  [ROUTES.leave]: {
    title: 'Leave',
    category: 'Time & Attendance',
    breadcrumbs: [homeCrumb, { label: 'Leave' }],
  },
  [ROUTES.timeTracking]: {
    title: 'Time Tracking',
    category: 'Time & Attendance',
    breadcrumbs: [homeCrumb, { label: 'Time Tracking' }],
  },
  [ROUTES.payroll]: {
    title: 'Payroll',
    category: 'Compensation',
    breadcrumbs: [homeCrumb, { label: 'Payroll' }],
  },
  [ROUTES.compensation]: {
    title: 'Compensation',
    category: 'Compensation',
    breadcrumbs: [homeCrumb, { label: 'Compensation' }],
  },
  [ROUTES.benefits]: {
    title: 'Benefits',
    category: 'Compensation',
    breadcrumbs: [homeCrumb, { label: 'Benefits' }],
  },
  [ROUTES.recruitment]: {
    title: 'Recruitment',
    category: 'Talent & Performance',
    breadcrumbs: [homeCrumb, { label: 'Recruitment' }],
  },
  [ROUTES.interviews]: {
    title: 'Interviews',
    category: 'Talent & Performance',
    breadcrumbs: [homeCrumb, { label: 'Interviews' }],
  },
  [ROUTES.performance]: {
    title: 'Performance',
    category: 'Talent & Performance',
    breadcrumbs: [homeCrumb, { label: 'Performance' }],
  },
  [ROUTES.onboarding]: {
    title: 'Onboarding',
    category: 'Talent & Performance',
    breadcrumbs: [homeCrumb, { label: 'Onboarding' }],
  },
  [ROUTES.training]: {
    title: 'Training',
    category: 'Talent & Performance',
    breadcrumbs: [homeCrumb, { label: 'Training' }],
  },
  [ROUTES.documents]: {
    title: 'Documents',
    category: 'Documents & Comms',
    breadcrumbs: [homeCrumb, { label: 'Documents' }],
  },
  [ROUTES.notifications]: {
    title: 'Notifications',
    category: 'Documents & Comms',
    breadcrumbs: [homeCrumb, { label: 'Notifications' }],
  },
  [ROUTES.roles]: {
    title: 'Roles',
    category: 'Administration',
    breadcrumbs: [homeCrumb, { label: 'Roles' }],
  },
  [ROUTES.permissions]: {
    title: 'Permissions',
    category: 'Administration',
    breadcrumbs: [homeCrumb, { label: 'Permissions' }],
  },
  [ROUTES.settings]: {
    title: 'Settings',
    category: 'Administration',
    breadcrumbs: [homeCrumb, { label: 'Settings' }],
  },
  [ROUTES.reports]: {
    title: 'Reports',
    category: 'Insights',
    breadcrumbs: [homeCrumb, { label: 'Reports' }],
  },
  [ROUTES.auditLogs]: {
    title: 'Audit Logs',
    category: 'Insights',
    breadcrumbs: [homeCrumb, { label: 'Audit Logs' }],
  },
  [ROUTES.tenants]: {
    title: 'Tenants',
    category: 'Platform',
    breadcrumbs: [homeCrumb, { label: 'Tenants' }],
  },
  [ROUTES.billing]: {
    title: 'Billing',
    category: 'Platform',
    breadcrumbs: [homeCrumb, { label: 'Billing' }],
  },
  [ROUTES.systemHealth]: {
    title: 'System Health',
    category: 'Platform',
    breadcrumbs: [homeCrumb, { label: 'System Health' }],
  },
  */
}

export function getRouteMeta(pathname: string): RouteMeta {
  const normalized =
    pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
  return (
    ROUTE_META[normalized] ?? {
      title: 'Page',
      category: 'HRIS',
      breadcrumbs: [homeCrumb, { label: 'Page' }],
    }
  )
}
