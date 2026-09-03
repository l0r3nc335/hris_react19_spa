import type { LucideIcon } from 'lucide-react'
import {
  LayoutDashboard,
  Users,
  Receipt,
  Sparkles,
  CircleDollarSign,
  ReceiptText
  /*
  BarChart3,
  UserCircle,
  Building2,
  Briefcase,
  Network,
  GitBranch,
  Clock,
  CalendarOff,
  Wallet,
  DollarSign,
  Heart,
  UserPlus,
  ClipboardList,
  Star,
  GraduationCap,
  FileText,
  Bell,
  Shield,
  KeyRound,
  Settings,
  FileBarChart,
  ScrollText,
  Building,
  CreditCard,
  Server,
  */
} from 'lucide-react'
import { ROUTES } from './routes'
import { PERMISSIONS, type Permission } from './permissions'

export interface NavItem {
  label: string
  path: string
  icon: LucideIcon
  iconBoxColor?: string
  permission?: Permission
}

export interface NavGroup {
  id: string
  label: string
  items: NavItem[]
}

export const NAV_GROUPS: NavGroup[] = [
  {
    id: 'overview',
    label: 'Overview',
    items: [
      { label: 'Dashboard', path: ROUTES.dashboard.dashboard, icon: LayoutDashboard },
      //{ label: 'Analytics', path: ROUTES.analytics, icon: BarChart3 },
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
        iconBoxColor: 'bg-blue-500',  
        permission: PERMISSIONS.manageSubscription,
      },
      {
        label: 'Payments',
        path: ROUTES.subscription.payments,
        icon: CircleDollarSign,
        iconBoxColor: 'bg-gradient-to-b from-pink-500 to-purple-900',
        permission: PERMISSIONS.manageSubscription,
      },
      {
        label: 'Billing & Invoice',
        path: ROUTES.subscription.billingInvoice,
        icon: ReceiptText,
        iconBoxColor: 'bg-green-500',
        permission: PERMISSIONS.manageSubscription,
      },
    ]
  },
  {
    id: 'people',
    label: 'People & Organization',
    items: [
      { 
        label: 'Users', 
        path: ROUTES.people.users, 
        icon: Users,
        iconBoxColor: 'bg-amber-500', 
        permission: PERMISSIONS.usersRead 
      },
      //{ label: 'Employees', path: ROUTES.employees, icon: UserCircle, permission: PERMISSIONS.employeesRead },
      //{ label: 'Employee Department', path: ROUTES.employeeDepartments, icon: GitBranch, permission: PERMISSIONS.employeeDepartmentsRead },
      //{ label: 'Departments', path: ROUTES.departments, icon: Building2, permission: PERMISSIONS.departmentsRead },
      //{ label: 'Positions', path: ROUTES.positions, icon: Briefcase },
      //{ label: 'Org Chart', path: ROUTES.orgChart, icon: Network },
    ],
  },
  {
    id: 'platform',
    label: 'Platform',
    items: [
      { label: 'Subscriptions', path: ROUTES.platform.subscriptions, icon: Receipt, permission: PERMISSIONS.usersRead },
      //{ label: 'Employees', path: ROUTES.employees, icon: UserCircle, permission: PERMISSIONS.employeesRead },
      //{ label: 'Employee Department', path: ROUTES.employeeDepartments, icon: GitBranch, permission: PERMISSIONS.employeeDepartmentsRead },
      //{ label: 'Departments', path: ROUTES.departments, icon: Building2, permission: PERMISSIONS.departmentsRead },
      //{ label: 'Positions', path: ROUTES.positions, icon: Briefcase },
      //{ label: 'Org Chart', path: ROUTES.orgChart, icon: Network },
    ],
  },
  {
    id: 'time',
    label: 'Time & Attendance',
    items: [
      //{ label: 'Attendance', path: ROUTES.attendance, icon: Clock },
      //{ label: 'Leave', path: ROUTES.leave, icon: CalendarOff },
      //{ label: 'Time Tracking', path: ROUTES.timeTracking, icon: Clock },
    ],
  },
  {
    id: 'compensation',
    label: 'Compensation',
    items: [
      //{ label: 'Payroll', path: ROUTES.payroll, icon: Wallet, permission: PERMISSIONS.payrollRead },
      //{ label: 'Compensation', path: ROUTES.compensation, icon: DollarSign },
      //{ label: 'Benefits', path: ROUTES.benefits, icon: Heart },
    ],
  },
  {
    id: 'talent',
    label: 'Talent & Performance',
    items: [
      //{ label: 'Recruitment', path: ROUTES.recruitment, icon: UserPlus },
      //{ label: 'Interviews', path: ROUTES.interviews, icon: ClipboardList },
      //{ label: 'Performance', path: ROUTES.performance, icon: Star },
      //{ label: 'Onboarding', path: ROUTES.onboarding, icon: UserPlus },
      //{ label: 'Training', path: ROUTES.training, icon: GraduationCap },
    ],
  },
  {
    id: 'documents',
    label: 'Documents & Comms',
    items: [
      //{ label: 'Documents', path: ROUTES.documents, icon: FileText },
      //{ label: 'Notifications', path: ROUTES.notifications, icon: Bell },
    ],
  },
  {
    id: 'administration',
    label: 'Administration',
    items: [
      //{ label: 'Roles', path: ROUTES.roles, icon: Shield, permission: PERMISSIONS.rolesManage },
      //{ label: 'Permissions', path: ROUTES.permissions, icon: KeyRound, permission: PERMISSIONS.rolesManage },
      //{ label: 'Settings', path: ROUTES.settings, icon: Settings, permission: PERMISSIONS.settingsWrite },
    ],
  },
  {
    id: 'insights',
    label: 'Insights',
    items: [
      //{ label: 'Reports', path: ROUTES.reports, icon: FileBarChart, permission: PERMISSIONS.reportsRead },
      //{ label: 'Audit Logs', path: ROUTES.auditLogs, icon: ScrollText, permission: PERMISSIONS.auditRead },
    ],
  },
  {
    id: 'platform',
    label: 'Platform',
    items: [
      //{ label: 'Tenants', path: ROUTES.tenants, icon: Building, permission: PERMISSIONS.tenantsManage },
      //{ label: 'Billing', path: ROUTES.billing, icon: CreditCard, permission: PERMISSIONS.billingRead },
      //{ label: 'System Health', path: ROUTES.systemHealth, icon: Server },
    ],
  },
]

/** Flat list for global search and backwards compatibility */
export const MAIN_NAV: NavItem[] = NAV_GROUPS.flatMap((group) => group.items)

export const DEFAULT_EXPANDED_NAV_GROUPS: string[] = []

export function navItemMatchesPath(itemPath: string, pathname: string): boolean {
  if (itemPath === ROUTES.dashboard.dashboard) {
    return pathname === itemPath
  }
  return pathname === itemPath || pathname.startsWith(`${itemPath}/`)
}

export function navGroupContainsPath(group: NavGroup, pathname: string): boolean {
  return group.items.some((item) => navItemMatchesPath(item.path, pathname))
}
