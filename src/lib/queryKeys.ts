export const queryKeys = {
    users: {
      all: ['users'] as const,
      list: () => [...queryKeys.users.all, 'list'] as const,
      trashed: () => [...queryKeys.users.all, 'trashed'] as const,
    },
    subscriptions: {
      all: ['subscriptions'] as const,
      list: () => [...queryKeys.subscriptions.all, 'list'] as const,
      trashed: () => [...queryKeys.subscriptions.all, 'trashed'] as const,
    },
    employees: {
      all: ['employees'] as const,
      list: () => [...queryKeys.employees.all, 'list'] as const,
      trashed: () => [...queryKeys.employees.all, 'trashed'] as const,
    },
    employeeDepartments: {
      all: ['employeeDepartments'] as const,
      list: () => [...queryKeys.employeeDepartments.all, 'list'] as const,
      trashed: () => [...queryKeys.employeeDepartments.all, 'trashed'] as const,
    },
    departments: {
      all: ['departments'] as const,
      list: () => [...queryKeys.departments.all, 'list'] as const,
      trashed: () => [...queryKeys.departments.all, 'trashed'] as const,
    },
    positions: {
      all: ['positions'] as const,
      list: () => [...queryKeys.positions.all, 'list'] as const,
      trashed: () => [...queryKeys.positions.all, 'trashed'] as const,
    },
    attendance: {
      all: ['attendance'] as const,
      list: () => [...queryKeys.attendance.all, 'list'] as const,
      trashed: () => [...queryKeys.attendance.all, 'trashed'] as const,
    },
    leave: {
      all: ['leave'] as const,
      list: () => [...queryKeys.leave.all, 'list'] as const,
      trashed: () => [...queryKeys.leave.all, 'trashed'] as const,
    },
    payroll: {
      all: ['payroll'] as const,
      list: () => [...queryKeys.payroll.all, 'list'] as const,
      trashed: () => [...queryKeys.payroll.all, 'trashed'] as const,
    },
    compensation: {
      all: ['compensation'] as const,
      list: () => [...queryKeys.compensation.all, 'list'] as const,
      trashed: () => [...queryKeys.compensation.all, 'trashed'] as const,
    },
    timeTracking: {
      all: ['timeTracking'] as const,
      list: () => [...queryKeys.timeTracking.all, 'list'] as const,
      trashed: () => [...queryKeys.timeTracking.all, 'trashed'] as const,
    },
    recruitment: {
      all: ['recruitment'] as const,
      list: () => [...queryKeys.recruitment.all, 'list'] as const,
      trashed: () => [...queryKeys.recruitment.all, 'trashed'] as const,
      applicants: () => [...queryKeys.recruitment.all, 'applicants'] as const,
    },
    interviews: {
      all: ['interviews'] as const,
      list: () => [...queryKeys.interviews.all, 'list'] as const,
      trashed: () => [...queryKeys.interviews.all, 'trashed'] as const,
    },
    performance: {
      all: ['performance'] as const,
      list: () => [...queryKeys.performance.all, 'list'] as const,
      trashed: () => [...queryKeys.performance.all, 'trashed'] as const,
    },
    organization: {
      all: ['organization'] as const,
      list: () => [...queryKeys.organization.all, 'list'] as const,
      trashed: () => [...queryKeys.organization.all, 'trashed'] as const,
    },
    documents: {
      all: ['documents'] as const,
      list: () => [...queryKeys.documents.all, 'list'] as const,
      trashed: () => [...queryKeys.documents.all, 'trashed'] as const,
    },
    notifications: {
      all: ['notifications'] as const,
      list: () => [...queryKeys.notifications.all, 'list'] as const,
      trashed: () => [...queryKeys.notifications.all, 'trashed'] as const,
    },
    roles: {
      all: ['roles'] as const,
      list: () => [...queryKeys.roles.all, 'list'] as const,
      trashed: () => [...queryKeys.roles.all, 'trashed'] as const,
    },
    audit: {
      all: ['audit'] as const,
      list: () => [...queryKeys.audit.all, 'list'] as const,
    },
    reports: {
      all: ['reports'] as const,
      list: () => [...queryKeys.reports.all, 'list'] as const,
    },
    analytics: {
      all: ['analytics'] as const,
      dashboard: () => [...queryKeys.analytics.all, 'dashboard'] as const,
    },
    settings: {
      all: ['settings'] as const,
      list: () => [...queryKeys.settings.all, 'list'] as const,
      trashed: () => [...queryKeys.settings.all, 'trashed'] as const,
    },
    tenants: {
      all: ['tenants'] as const,
      list: () => [...queryKeys.tenants.all, 'list'] as const,
      trashed: () => [...queryKeys.tenants.all, 'trashed'] as const,
    },
    billing: {
      all: ['billing'] as const,
      list: () => [...queryKeys.billing.all, 'list'] as const,
      trashed: () => [...queryKeys.billing.all, 'trashed'] as const,
    },
    system: {
      all: ['system'] as const,
      list: () => [...queryKeys.system.all, 'list'] as const,
    },
    permissions: {
      all: ['permissions'] as const,
      list: () => [...queryKeys.permissions.all, 'list'] as const,
      trashed: () => [...queryKeys.permissions.all, 'trashed'] as const,
    },
    onboarding: {
      all: ['onboarding'] as const,
      list: () => [...queryKeys.onboarding.all, 'list'] as const,
      trashed: () => [...queryKeys.onboarding.all, 'trashed'] as const,
    },
    benefits: {
      all: ['benefits'] as const,
      list: () => [...queryKeys.benefits.all, 'list'] as const,
      trashed: () => [...queryKeys.benefits.all, 'trashed'] as const,
    },
    training: {
      all: ['training'] as const,
      list: () => [...queryKeys.training.all, 'list'] as const,
      trashed: () => [...queryKeys.training.all, 'trashed'] as const,
    },
    leavePending: {
      all: ['leavePending'] as const,
      list: () => [...queryKeys.leavePending.all, 'list'] as const,
    },
    attendanceToday: {
      all: ['attendanceToday'] as const,
      list: () => [...queryKeys.attendanceToday.all, 'list'] as const,
    },
    payrollSummary: {
      all: ['payrollSummary'] as const,
      summary: () => [...queryKeys.payrollSummary.all, 'summary'] as const,
    },
    messages: {
      all: ['messages'] as const,
      inbox: () => [...queryKeys.messages.all, 'inbox'] as const,
    },
    notificationsUnread: {
      all: ['notificationsUnread'] as const,
      list: () => [...queryKeys.notificationsUnread.all, 'list'] as const,
    },
    orgChart: {
      all: ['orgChart'] as const,
      tree: () => [...queryKeys.orgChart.all, 'tree'] as const,
    },
  } as const
  