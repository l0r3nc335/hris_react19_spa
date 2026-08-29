export const PERMISSIONS = {
  usersRead: 'users:read',
  usersWrite: 'users:write',

  employeesRead: 'employees:read',
  employeesWrite: 'employees:write',
  employeeDepartmentsRead: 'employee-departments:read',
  employeeDepartmentsWrite: 'employee-departments:write',

  payrollRead: 'payroll:read',
  payrollRun: 'payroll:run',

  departmentsRead: 'departments:read',
  leaveRead: 'leave:read',
  leaveApprove: 'leave:approve',

  recruitmentRead: 'recruitment:read',
  timesheetsRead: 'timesheets:read',
  rostersRead: 'rosters:read',
  expensesRead: 'expenses:read',
  certificationsRead: 'certifications:read',
  vaccinationsRead: 'vaccinations:read',
  complianceRead: 'compliance:read',
  travelRead: 'travel:read',
  vehiclesRead: 'vehicles:read',

  companySettingsRead: 'company-settings:read',
  companySettingsWrite: 'company-settings:write',

  rolesManage: 'roles:manage',
  tenantsManage: 'tenants:manage',
  auditRead: 'audit:read',
  settingsWrite: 'settings:write',
  reportsRead: 'reports:read',
  billingRead: 'billing:read',

  manageSubscription: 'manage:subscription',
  subscriptionsRead: 'subscriptions:read',
  subscriptionsWrite: 'subscriptions:write',
  subscriptionPlansRead: 'my-subscription:read', // TODO: BE & FE → subscription-plans:read
} as const

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS]

export const ALL_PERMISSIONS: Permission[] = Object.values(PERMISSIONS)
  