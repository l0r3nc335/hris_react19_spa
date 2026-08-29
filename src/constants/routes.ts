export const ROUTES = {
  public: {
    landing: '/',
    about: '/about',
    pricing: '/pricing',
    contactus: '/contact-us',
  },

  auth: {
    login: '/auth/login',
    register: '/auth/register',
    verifyEmail: '/auth/verify-email',
    verify: '/auth/verify',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
  },

  dashboard: {
    dashboard: '/dashboard',
    home: '/home',
  },

  people: {
    users: '/users',
    employees: '/employees',
    employeeProfile: '/employees/:id',
    professionalDevelopment: '/professional-development',
    leave: '/leave',
  },

  recruitment: {
    contracts: '/contracts',
    onboardingOffboarding: '/onboarding-offboarding',
    jobOffers: '/job-offers',
  },

  operational: {
    timesheets: '/timesheets',
    rosters: '/rosters',
    expenses: '/expenses',
    certifications: '/certifications',
    vaccinations: '/vaccinations',
    compliance: '/compliance',
    notifications: '/notifications',
    payslips: '/payslips',
  },

  travel: {
    travelLog: '/travel',
    vehicles: '/vehicles',
  },

  resources: {
    index: '/resources',
  },

  reporting: {
    index: '/reporting',
  },

  companySettings: {
    hub: '/company-settings',
    profile: '/company-settings/profile',
    roles: '/company-settings/roles',
    divisions: '/company-settings/divisions',
    groups: '/company-settings/groups',
    locations: '/company-settings/locations',
    employmentBasis: '/company-settings/employment-basis',
    classifications: '/company-settings/classifications',
    payRates: '/company-settings/pay-rates',
    allowances: '/company-settings/allowances',
    vaccinationTypes: '/company-settings/vaccination-types',
    certificationTypes: '/company-settings/certification-types',
  },

  platform: {
    subscriptions: '/subscriptions',
  },

  subscription: {
    plans: '/subscription/plans',
  },

  mySubscription: {
    mySubscriptionPayment: '/my-subscription/payment/:subscriptionId',
  },

  system: {
    settings: '/settings',
  },
} as const

function collectPaths(value: unknown): string[] {
  if (typeof value === 'string') return [value]
  if (value && typeof value === 'object') {
    return Object.values(value).flatMap(collectPaths)
  }
  return []
}

const KNOWN_ROUTE_PATHS = new Set<string>(collectPaths(ROUTES))

export function isKnownRoute(pathname: string): boolean {
  const normalized =
    pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
  if (KNOWN_ROUTE_PATHS.has(normalized)) return true
  // Dynamic segments (e.g. /employees/:id)
  if (/^\/employees\/[^/]+$/.test(normalized)) return true
  if (/^\/subscription\/plans\/[^/]+\/payment-methods$/.test(normalized)) return true
  if (/^\/subscription\/payment\/[^/]+$/.test(normalized)) return true
  return false
}

export function employeeProfilePath(id: string): string {
  return `/employees/${id}`
}
