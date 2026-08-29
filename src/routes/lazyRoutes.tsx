import { lazy } from 'react'

export const LandingPage = lazy(() =>
  import('@/modules/public/pages/LandingPage').then((m) => ({ default: m.LandingPage })),
)

export const AboutPage = lazy(() =>
  import('@/modules/public/pages/AboutPage').then((m) => ({ default: m.AboutPage })),
)

export const PricingPage = lazy(() =>
  import('@/modules/public/pages/PricingPage').then((m) => ({ default: m.PricingPage })),
)

export const ContactPage = lazy(() =>
  import('@/modules/public/pages/ContactPage').then((m) => ({ default: m.ContactPage })),
)

export const LoginPage = lazy(() =>
  import('@/modules/auth/pages/LoginPage').then((m) => ({ default: m.LoginPage })),
)

export const ForgotPasswordPage = lazy(() =>
  import('@/modules/auth/pages/ForgotPasswordPage').then((m) => ({
    default: m.ForgotPasswordPage,
  })),
)

export const RegisterPage = lazy(() =>
  import('@/modules/auth/pages/RegisterPage').then((m) => ({ default: m.RegisterPage })),
)

export const VerifyEmailPage = lazy(() =>
  import('@/modules/auth/pages/VerifyEmailPage').then((m) => ({ default: m.VerifyEmailPage })),
)

export const DashboardPage = lazy(() =>
  import('@/modules/dashboard/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })),
)

export const SubscriptionsListPage = lazy(() =>
  import('@/modules/subscriptions/pages/SubscriptionsListPage').then((m) => ({
    default: m.SubscriptionsListPage,
  })),
)

export const SubscriptionPlansPage = lazy(() =>
  import('@/modules/subscriptions/pages/PlansPage').then((m) => ({ default: m.PlansPage })),
)

export const SubscriptionPlanPaymentMethods = lazy(() =>
  import('@/modules/subscriptions/pages/PaymentMethodsPage').then((m) => ({
    default: m.PaymentMethodsPage,
  })),
)

export const UsersListPage = lazy(() =>
  import('@/modules/users/pages/UsersListPage').then((m) => ({ default: m.UsersListPage })),
)

export const NotFoundPage = lazy(() =>
  import('@/components/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
)

export const PaymentPage = lazy(() =>
  import('@/modules/mySubscription/pages/PaymentPage').then((m) => ({ default: m.PaymentPage })),
)

// People
export const EmployeesListPage = lazy(() =>
  import('@/modules/employees/pages/EmployeesListPage').then((m) => ({
    default: m.EmployeesListPage,
  })),
)

export const EmployeeProfilePage = lazy(() =>
  import('@/modules/employees/pages/EmployeeProfilePage').then((m) => ({
    default: m.EmployeeProfilePage,
  })),
)

export const ProfessionalDevelopmentPage = lazy(() =>
  import('@/modules/professionalDevelopment/pages/ProfessionalDevelopmentPage').then((m) => ({
    default: m.ProfessionalDevelopmentPage,
  })),
)

export const LeaveManagementPage = lazy(() =>
  import('@/modules/leave/pages/LeaveManagementPage').then((m) => ({
    default: m.LeaveManagementPage,
  })),
)

// Recruitment
export const ContractsPage = lazy(() =>
  import('@/modules/contracts/pages/ContractsPage').then((m) => ({ default: m.ContractsPage })),
)

export const OnboardingOffboardingPage = lazy(() =>
  import('@/modules/onboardingOffboarding/pages/OnboardingOffboardingPage').then((m) => ({
    default: m.OnboardingOffboardingPage,
  })),
)

export const JobOffersPage = lazy(() =>
  import('@/modules/jobOffers/pages/JobOffersPage').then((m) => ({ default: m.JobOffersPage })),
)

// Operational
export const TimesheetsPage = lazy(() =>
  import('@/modules/timesheets/pages/TimesheetsPage').then((m) => ({ default: m.TimesheetsPage })),
)

export const RostersPage = lazy(() =>
  import('@/modules/rosters/pages/RostersPage').then((m) => ({ default: m.RostersPage })),
)

export const ExpensesPage = lazy(() =>
  import('@/modules/expenses/pages/ExpensesPage').then((m) => ({ default: m.ExpensesPage })),
)

export const CertificationsPage = lazy(() =>
  import('@/modules/certifications/pages/CertificationsPage').then((m) => ({
    default: m.CertificationsPage,
  })),
)

export const VaccinationsPage = lazy(() =>
  import('@/modules/vaccinations/pages/VaccinationsPage').then((m) => ({
    default: m.VaccinationsPage,
  })),
)

export const CompliancePage = lazy(() =>
  import('@/modules/compliance/pages/CompliancePage').then((m) => ({ default: m.CompliancePage })),
)

export const NotificationsPage = lazy(() =>
  import('@/modules/notifications/pages/NotificationsPage').then((m) => ({
    default: m.NotificationsPage,
  })),
)

export const PayslipsPage = lazy(() =>
  import('@/modules/payroll/pages/PayslipsPage').then((m) => ({ default: m.PayslipsPage })),
)

// Travel / Resources / Reporting
export const TravelLogPage = lazy(() =>
  import('@/modules/travel/pages/TravelLogPage').then((m) => ({ default: m.TravelLogPage })),
)

export const VehiclesPage = lazy(() =>
  import('@/modules/vehicles/pages/VehiclesPage').then((m) => ({ default: m.VehiclesPage })),
)

export const ResourcesPage = lazy(() =>
  import('@/modules/resources/pages/ResourcesPage').then((m) => ({ default: m.ResourcesPage })),
)

export const ReportingPage = lazy(() =>
  import('@/modules/reporting/pages/ReportingPage').then((m) => ({ default: m.ReportingPage })),
)

// Company Settings
export const CompanySettingsHubPage = lazy(() =>
  import('@/modules/companySettings/pages/CompanySettingsHubPage').then((m) => ({
    default: m.CompanySettingsHubPage,
  })),
)

export const CompanyProfilePage = lazy(() =>
  import('@/modules/companySettings/pages/CompanyProfilePage').then((m) => ({
    default: m.CompanyProfilePage,
  })),
)

export const RolesPermissionsPage = lazy(() =>
  import('@/modules/companySettings/pages/RolesPermissionsPage').then((m) => ({
    default: m.RolesPermissionsPage,
  })),
)

export const DivisionsPage = lazy(() =>
  import('@/modules/companySettings/pages/DivisionsPage').then((m) => ({
    default: m.DivisionsPage,
  })),
)

export const GroupsPage = lazy(() =>
  import('@/modules/companySettings/pages/GroupsPage').then((m) => ({ default: m.GroupsPage })),
)

export const LocationsPage = lazy(() =>
  import('@/modules/companySettings/pages/LocationsPage').then((m) => ({
    default: m.LocationsPage,
  })),
)

export const EmploymentBasisPage = lazy(() =>
  import('@/modules/companySettings/pages/EmploymentBasisPage').then((m) => ({
    default: m.EmploymentBasisPage,
  })),
)

export const ClassificationsPage = lazy(() =>
  import('@/modules/companySettings/pages/ClassificationsPage').then((m) => ({
    default: m.ClassificationsPage,
  })),
)

export const PayRatesPage = lazy(() =>
  import('@/modules/companySettings/pages/PayRatesPage').then((m) => ({
    default: m.PayRatesPage,
  })),
)

export const AllowancesPage = lazy(() =>
  import('@/modules/companySettings/pages/AllowancesPage').then((m) => ({
    default: m.AllowancesPage,
  })),
)

export const VaccinationTypesPage = lazy(() =>
  import('@/modules/companySettings/pages/VaccinationTypesPage').then((m) => ({
    default: m.VaccinationTypesPage,
  })),
)

export const CertificationTypesPage = lazy(() =>
  import('@/modules/companySettings/pages/CertificationTypesPage').then((m) => ({
    default: m.CertificationTypesPage,
  })),
)
