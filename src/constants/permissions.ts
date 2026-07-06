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
    leaveApprove: 'leave:approve',
    rolesManage: 'roles:manage',
    tenantsManage: 'tenants:manage',
    auditRead: 'audit:read',
    settingsWrite: 'settings:write',
    reportsRead: 'reports:read',
    billingRead: 'billing:read',

    //current be supported
    subscriptionsRead: 'subscriptions:read',
    subscriptionsWrite: 'subscriptions:write',
    //forward  guidance vs  //curent pemissions from be
    subscriptionPlansRead: 'my-subscription:read', //TODO: BE & FE change to subscription-plans:read

  } as const
  
  export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS]
  
  export const ALL_PERMISSIONS: Permission[] = Object.values(PERMISSIONS)
  