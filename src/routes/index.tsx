import AuthLayout from '@/layouts/AuthLayout'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { PublicLayout } from '@/layouts/PublicLayout'
import { Suspense, type ReactNode } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './protectedRoute'
import * as Lazy from '@/routes/lazyRoutes'
import { PageLoader } from '@/components/PageLoader'
import { ROUTES } from '@/constants/routes'
import { RootLayout } from '@/layouts/RootLayout'
import { lazyRouteElement } from '@/routes/lazyRouteElement'
import { ROUTE_SEGMENT_PERMISSIONS } from '@/constants/routePermissions'
import { PERMISSIONS } from '@/constants/permissions'

interface SuspenseWrapProps {
  children: ReactNode
}

function SuspenseWrap({ children }: SuspenseWrapProps): React.JSX.Element {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>
}

function dashboardRoute(
  path: string,
  page: Parameters<typeof lazyRouteElement>[0],
): { path: string; element: ReactNode } {
  return {
    path,
    element: lazyRouteElement(page, ROUTE_SEGMENT_PERMISSIONS[path]),
  }
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          { index: true, element: <SuspenseWrap><Lazy.LandingPage /></SuspenseWrap> },
          { path: 'about', element: <SuspenseWrap><Lazy.AboutPage /></SuspenseWrap> },
          { path: 'pricing', element: <SuspenseWrap><Lazy.PricingPage /></SuspenseWrap> },
          { path: 'contact-us', element: <SuspenseWrap><Lazy.ContactPage /></SuspenseWrap> },
        ],
      },
      {
        path: '/auth',
        element: <AuthLayout />,
        children: [
          { path: 'login', index: true, element: <SuspenseWrap><Lazy.LoginPage /></SuspenseWrap> },
          {
            path: 'forgot-password',
            element: <SuspenseWrap><Lazy.ForgotPasswordPage /></SuspenseWrap>,
          },
          { path: 'register', element: <SuspenseWrap><Lazy.RegisterPage /></SuspenseWrap> },
          { path: 'verify-email', element: <SuspenseWrap><Lazy.VerifyEmailPage /></SuspenseWrap> },
          { path: 'verify', element: <SuspenseWrap><Lazy.VerifyEmailPage /></SuspenseWrap> },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              { path: 'dashboard', element: lazyRouteElement(Lazy.DashboardPage) },

              // People
              dashboardRoute('employees', Lazy.EmployeesListPage),
              { path: 'employees/:id', element: lazyRouteElement(Lazy.EmployeeProfilePage) },
              dashboardRoute('professional-development', Lazy.ProfessionalDevelopmentPage),
              dashboardRoute('leave', Lazy.LeaveManagementPage),

              // Recruitment
              dashboardRoute('contracts', Lazy.ContractsPage),
              dashboardRoute('onboarding-offboarding', Lazy.OnboardingOffboardingPage),
              dashboardRoute('job-offers', Lazy.JobOffersPage),

              // Operational
              dashboardRoute('timesheets', Lazy.TimesheetsPage),
              dashboardRoute('rosters', Lazy.RostersPage),
              dashboardRoute('expenses', Lazy.ExpensesPage),
              dashboardRoute('certifications', Lazy.CertificationsPage),
              dashboardRoute('vaccinations', Lazy.VaccinationsPage),
              dashboardRoute('compliance', Lazy.CompliancePage),
              dashboardRoute('notifications', Lazy.NotificationsPage),
              dashboardRoute('payslips', Lazy.PayslipsPage),

              // Travel / Resources / Reporting
              dashboardRoute('travel', Lazy.TravelLogPage),
              dashboardRoute('vehicles', Lazy.VehiclesPage),
              dashboardRoute('resources', Lazy.ResourcesPage),
              dashboardRoute('reporting', Lazy.ReportingPage),

              // Company Settings
              dashboardRoute('company-settings', Lazy.CompanySettingsHubPage),
              dashboardRoute('company-settings/profile', Lazy.CompanyProfilePage),
              dashboardRoute('company-settings/roles', Lazy.RolesPermissionsPage),
              dashboardRoute('company-settings/divisions', Lazy.DivisionsPage),
              dashboardRoute('company-settings/groups', Lazy.GroupsPage),
              dashboardRoute('company-settings/locations', Lazy.LocationsPage),
              dashboardRoute('company-settings/employment-basis', Lazy.EmploymentBasisPage),
              dashboardRoute('company-settings/classifications', Lazy.ClassificationsPage),
              dashboardRoute('company-settings/pay-rates', Lazy.PayRatesPage),
              dashboardRoute('company-settings/allowances', Lazy.AllowancesPage),
              dashboardRoute('company-settings/vaccination-types', Lazy.VaccinationTypesPage),
              dashboardRoute('company-settings/certification-types', Lazy.CertificationTypesPage),

              // Existing platform routes
              {
                path: 'subscription',
                children: [dashboardRoute('plans', Lazy.SubscriptionPlansPage)],
              },
              {
                path: 'subscription',
                children: [
                  dashboardRoute('plans/:slug/payment-methods', Lazy.SubscriptionPlanPaymentMethods),
                ],
              },
              {
                path: 'subscription/payment/:subscriptionId',
                element: lazyRouteElement(Lazy.PaymentPage, PERMISSIONS.subscriptionPlansRead),
              },
              dashboardRoute('users', Lazy.UsersListPage),
              dashboardRoute('subscriptions', Lazy.SubscriptionsListPage),
              dashboardRoute('subscription/plans', Lazy.SubscriptionPlansPage),

              { path: '*', element: <SuspenseWrap><Lazy.NotFoundPage /></SuspenseWrap> },
            ],
          },
        ],
      },
      { path: 'logout', element: <Navigate to={ROUTES.auth.login} replace /> },
      { path: '*', element: <Navigate to={ROUTES.public.landing} replace /> },
    ],
  },
])
