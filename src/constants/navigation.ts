import type { LucideIcon } from 'lucide-react'
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CalendarOff,
  FileText,
  UserPlus,
  Briefcase,
  Clock,
  CalendarDays,
  Wallet,
  BadgeCheck,
  Syringe,
  ShieldCheck,
  Bell,
  Plane,
  Car,
  FolderOpen,
  BarChart3,
  Settings,
  Sparkles,
  Receipt,
} from 'lucide-react'
import { ROUTES } from './routes'
import { PERMISSIONS, type Permission } from './permissions'

export interface NavItem {
  label: string
  path: string
  icon: LucideIcon
  permission?: Permission
  children?: NavItem[]
}

export interface NavGroup {
  id: string
  label: string
  items: NavItem[]
}

export const NAV_GROUPS: NavGroup[] = [
  {
    id: 'main',
    label: 'Main',
    items: [
      {
        label: 'Dashboard',
        path: ROUTES.dashboard.dashboard,
        icon: LayoutDashboard,
      },
      {
        label: 'People',
        path: ROUTES.people.employees,
        icon: Users,
        children: [
          {
            label: 'Employee',
            path: ROUTES.people.employees,
            icon: Users,
            permission: PERMISSIONS.employeesRead,
          },
          {
            label: 'Professional Development',
            path: ROUTES.people.professionalDevelopment,
            icon: GraduationCap,
            permission: PERMISSIONS.employeesRead,
          },
          {
            label: 'Leave Management',
            path: ROUTES.people.leave,
            icon: CalendarOff,
            permission: PERMISSIONS.leaveRead,
          },
        ],
      },
      {
        label: 'Recruitment',
        path: ROUTES.recruitment.contracts,
        icon: UserPlus,
        children: [
          {
            label: 'Contract Management',
            path: ROUTES.recruitment.contracts,
            icon: FileText,
            permission: PERMISSIONS.recruitmentRead,
          },
          {
            label: 'Onboarding & Offboarding',
            path: ROUTES.recruitment.onboardingOffboarding,
            icon: UserPlus,
            permission: PERMISSIONS.recruitmentRead,
          },
          {
            label: 'Job Offers',
            path: ROUTES.recruitment.jobOffers,
            icon: Briefcase,
            permission: PERMISSIONS.recruitmentRead,
          },
        ],
      },
      {
        label: 'Operational',
        path: ROUTES.operational.timesheets,
        icon: Clock,
        children: [
          {
            label: 'Timesheets',
            path: ROUTES.operational.timesheets,
            icon: Clock,
            permission: PERMISSIONS.timesheetsRead,
          },
          {
            label: 'Rosters',
            path: ROUTES.operational.rosters,
            icon: CalendarDays,
            permission: PERMISSIONS.rostersRead,
          },
          {
            label: 'Expenses',
            path: ROUTES.operational.expenses,
            icon: Wallet,
            permission: PERMISSIONS.expensesRead,
          },
          {
            label: 'Certifications',
            path: ROUTES.operational.certifications,
            icon: BadgeCheck,
            permission: PERMISSIONS.certificationsRead,
          },
          {
            label: 'Vaccinations',
            path: ROUTES.operational.vaccinations,
            icon: Syringe,
            permission: PERMISSIONS.vaccinationsRead,
          },
          {
            label: 'Compliance',
            path: ROUTES.operational.compliance,
            icon: ShieldCheck,
            permission: PERMISSIONS.complianceRead,
          },
          {
            label: 'Send Notifications',
            path: ROUTES.operational.notifications,
            icon: Bell,
          },
        ],
      },
      {
        label: 'Travel',
        path: ROUTES.travel.travelLog,
        icon: Plane,
        children: [
          {
            label: 'Travel Log',
            path: ROUTES.travel.travelLog,
            icon: Plane,
            permission: PERMISSIONS.travelRead,
          },
          {
            label: 'Vehicle Management',
            path: ROUTES.travel.vehicles,
            icon: Car,
            permission: PERMISSIONS.vehiclesRead,
          },
        ],
      },
      {
        label: 'Resources',
        path: ROUTES.resources.index,
        icon: FolderOpen,
      },
      {
        label: 'Reporting',
        path: ROUTES.reporting.index,
        icon: BarChart3,
        permission: PERMISSIONS.reportsRead,
      },
      {
        label: 'Company Settings',
        path: ROUTES.companySettings.hub,
        icon: Settings,
        permission: PERMISSIONS.companySettingsRead,
      },
    ],
  },
  {
    id: 'subscription',
    label: 'Subscription',
    items: [
      {
        label: 'Plans',
        path: ROUTES.subscription.plans,
        icon: Sparkles,
        permission: PERMISSIONS.manageSubscription,
      },
      {
        label: 'Subscriptions',
        path: ROUTES.platform.subscriptions,
        icon: Receipt,
        permission: PERMISSIONS.subscriptionsRead,
      },
      {
        label: 'Users',
        path: ROUTES.people.users,
        icon: Users,
        permission: PERMISSIONS.usersRead,
      },
    ],
  },
]

function flattenNavItems(items: NavItem[]): NavItem[] {
  return items.flatMap((item) =>
    item.children?.length ? [item, ...flattenNavItems(item.children)] : [item],
  )
}

/** Flat list for global search, permissions wiring, and backwards compatibility */
export const MAIN_NAV: NavItem[] = NAV_GROUPS.flatMap((group) => flattenNavItems(group.items))

export const DEFAULT_EXPANDED_NAV_GROUPS: string[] = ['main']

export function navItemMatchesPath(itemPath: string, pathname: string): boolean {
  if (itemPath === ROUTES.dashboard.dashboard) {
    return pathname === itemPath
  }
  return pathname === itemPath || pathname.startsWith(`${itemPath}/`)
}

export function navItemOrChildrenMatchPath(item: NavItem, pathname: string): boolean {
  if (navItemMatchesPath(item.path, pathname)) return true
  return item.children?.some((child) => navItemOrChildrenMatchPath(child, pathname)) ?? false
}

export function navGroupContainsPath(group: NavGroup, pathname: string): boolean {
  return group.items.some((item) => navItemOrChildrenMatchPath(item, pathname))
}

export function filterNavItemsByQuery(items: NavItem[], query: string): NavItem[] {
  if (!query) return items
  const result: NavItem[] = []
  for (const item of items) {
    const labelMatch = item.label.toLowerCase().includes(query)
    const filteredChildren = item.children
      ? filterNavItemsByQuery(item.children, query)
      : undefined
    if (labelMatch || (filteredChildren && filteredChildren.length > 0)) {
      result.push({
        ...item,
        children: filteredChildren?.length ? filteredChildren : item.children,
      })
    }
  }
  return result
}
